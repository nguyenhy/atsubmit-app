import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { FormDomainSettings } from "../Form";

export const getFormDomainService = async (
    c: MainContext,
    data: {
        user_id: string;
        slug: string;
    },
) => {
    const query = `
        SELECT
            allowed_domains,
            disallowed_domains
        FROM forms
        WHERE
            user_id = $1
            AND endpoint_slug = $2
    `;
    const params = [data.user_id, data.slug];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<FormDomainSettings>(query, params);
    });

    return result.rows[0] || null;
};
