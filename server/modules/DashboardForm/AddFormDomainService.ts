import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { FormDomainSettings } from "../Form";

export const addFormDomainService = async (
    c: MainContext,
    data: {
        user_id: string;
        slug: string;
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
                        AND NOT (
                            $3::text = ANY(
                                COALESCE(allowed_domains, '{}')
                            )
                        )
                    THEN
                        array_append(
                            COALESCE(allowed_domains, '{}'),
                            $3::text
                        )
                    ELSE
                        allowed_domains
                END,

            disallowed_domains =
                CASE
                    WHEN $4::text IS NOT NULL
                        AND NOT (
                            $4::text = ANY(
                                COALESCE(disallowed_domains, '{}')
                            )
                        )
                    THEN
                        array_append(
                            COALESCE(disallowed_domains, '{}'),
                            $4::text
                        )
                    ELSE
                        disallowed_domains
                END
        WHERE
            user_id = $1
            AND endpoint_slug = $2
        RETURNING
            allowed_domains,
            disallowed_domains;
	`;
    const params = [
        data.user_id,
        data.slug,
        data.allow || null,
        data.disallow || null,
    ];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<FormDomainSettings>(query, params);
    });

    return result.rows[0] || null;
};
