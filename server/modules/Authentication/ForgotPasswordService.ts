import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";

export const verifyCanResetPassword = async (c: MainContext, email: string) => {
    const query = `
	SELECT 1
	FROM password_reset_tokens prt
	JOIN users u
		ON u.id = prt.user_id
	WHERE
		u.email = $1
		AND u.deleted_at IS NULL
		AND prt.created_at > now() - interval '60 seconds'
	ORDER BY
		prt.created_at DESC
	LIMIT 1;
    `;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query(query, [email]);
    });

    return result.rowCount === 0;
};

export const insertPasswordResetTokenRecord = async (
    c: MainContext,
    data: {
        email: string;
        token: string;
    },
) => {
    const query = `
	INSERT INTO
		password_reset_tokens (
			user_id,
			token_hash,
			expires_at
		)
	SELECT
		u.id,
		encode(digest($1, 'sha256'), 'hex'),
		now() + interval '1 hour'
	FROM users u
	WHERE
		u.email = $2
		AND u.deleted_at is null
	LIMIT 1
	;
`;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query(query, [data.token, data.email]);
    });

    return result.rowCount === 1;
};
