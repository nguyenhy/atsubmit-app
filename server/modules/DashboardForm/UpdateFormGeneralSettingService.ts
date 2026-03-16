import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { Form } from "../Form";
import { randomBytes } from "node:crypto";

export const updateFormGeneralSettingService = async (
    c: MainContext,
    data: {
        user_id: string;
        id: string;
        isActive: boolean;
        name?: string;
    },
) => {
    const query = `
        UPDATE forms
		SET
            name = COALESCE($3, name),
			is_active = $4
            , updated_at = now()
        WHERE
			user_id = $1
			AND id = $2
    `;

    const params = [data.user_id, data.id, data.name || null, !!data.isActive];

    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<
            Pick<
                Form,
                | "id"
                | "name"
                | "endpoint_slug"
                | "is_active"
                | "created_at"
                | "updated_at"
            > & { total: number }
        >(query, params);
    });

    return result.rows[0] || null;
};

export const createRandomToken = () => randomBytes(32).toString("hex");
export const createRandomSlug = () => randomBytes(16).toString("hex");
