import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserDomainSettings } from "../Authentication/UserSettings";

export const deleteDefaultDomainService = async (
    c: MainContext,
    data: {
        user_id: string;
        allow?: string;
        disallow?: string;
    },
) => {
    const query = `
        UPDATE user_settings
        SET
            default_allowed_domains =
                CASE
                    WHEN $2::text IS NOT NULL
                    THEN
                        array_remove(
                            COALESCE(default_allowed_domains, '{}'),
                            $2::text
                        )
                    ELSE
                        default_allowed_domains
                END,

            default_disallowed_domains =
                CASE
                    WHEN $3::text IS NOT NULL
                    THEN
                        array_remove(
                            COALESCE(default_disallowed_domains, '{}'),
                            $3::text
                        )
                    ELSE
                        default_disallowed_domains
                END
        WHERE user_id = $1
        RETURNING
            default_allowed_domains,
            default_disallowed_domains;
	`;
    const params = [data.user_id, data.allow || null, data.disallow || null];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserDomainSettings>(query, params);
    });

    return result.rows[0] || null;
};
