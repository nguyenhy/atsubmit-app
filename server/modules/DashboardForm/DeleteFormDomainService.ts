import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserDomainSettings } from "../Authentication/UserSettings";

export const deleteFormDomainService = async (
    c: MainContext,
    data: {
        user_id: string;
        id: string;
        allow?: string;
        disallow?: string;
    },
) => {
    const query = `
        UPDATE forms
        SET
            allowed_domains =
                CASE
                    WHEN $3::text IS NOT NULL
                    THEN
                        array_remove(
                            COALESCE(allowed_domains, '{}'),
                            $3::text
                        )
                    ELSE
                        allowed_domains
                END,

            disallowed_domains =
                CASE
                    WHEN $4::text IS NOT NULL
                    THEN
                        array_remove(
                            COALESCE(disallowed_domains, '{}'),
                            $4::text
                        )
                    ELSE
                        disallowed_domains
                END
        WHERE
            user_id = $1
            AND id = $2

        RETURNING
            allowed_domains,
            disallowed_domains;
	`;
    const params = [data.user_id, data.allow || null, data.disallow || null];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserDomainSettings>(query, params);
    });

    return result.rows[0] || null;
};
