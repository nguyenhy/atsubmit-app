import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { Form } from "../Form";

export const getFormGeneralSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        slug: string;
    },
) => {
    const query = `
        SELECT
            name,
            endpoint_slug,
            is_active,
            submit_token,
            created_at,
            updated_at
        FROM forms
        WHERE
            user_id = $1
            AND endpoint_slug = $2
        LIMIT 1
    `;

    const params = [data.user_id, data.slug];

    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<
            Pick<
                Form,
                | "name"
                | "endpoint_slug"
                | "is_active"
                | "submit_token"
                | "created_at"
                | "updated_at"
            >
        >(query, params);
    });

    return result.rows[0] || null;
};
