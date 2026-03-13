import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserDomainSettings } from "../Authentication/UserSettings";

export const addDefaultDomainService = async (
    c: MainContext,
    data: {
        user_id: string;
        allow?: string;
        disallow?: string;
    },
) => {
    const query = `
        INSERT INTO user_settings (
            user_id,
            default_allowed_domains,
            default_disallowed_domains
        )
        VALUES (
            $1,
            CASE WHEN $2::text IS NOT NULL THEN ARRAY[$2::text] ELSE NULL END,
            CASE WHEN $3::text IS NOT NULL THEN ARRAY[$3::text] ELSE NULL END
        )
        ON CONFLICT (user_id)
        DO UPDATE
        SET
            default_allowed_domains =
                CASE
                    WHEN $2::text IS NOT NULL
                        AND NOT (
                            $2::text = ANY(
                                COALESCE(user_settings.default_allowed_domains, '{}')
                            )
                        )
                    THEN
                        array_append(
                            COALESCE(user_settings.default_allowed_domains, '{}'),
                            $2::text
                        )
                    ELSE
                        user_settings.default_allowed_domains
                END,

            default_disallowed_domains =
                CASE
                    WHEN $3::text IS NOT NULL
                        AND NOT (
                            $3::text = ANY(
                                COALESCE(user_settings.default_disallowed_domains, '{}')
                            )
                        )
                    THEN
                        array_append(
                            COALESCE(user_settings.default_disallowed_domains, '{}'),
                            $3::text
                        )
                    ELSE
                        user_settings.default_disallowed_domains
                END

        RETURNING
            default_allowed_domains,
            default_disallowed_domains;
	`;
    const params = [data.user_id, data.allow || null, data.disallow || null];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserDomainSettings>(query, params);
    });

    console.log(result.rows);

    return result.rows[0] || null;
};
