import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserHoneypotSettings } from "../Authentication/UserSettings";

export const getAccountHoneypotFormSetting = async (
    c: MainContext,
    email: string,
) => {
    const query = `
		SELECT
			us.default_honeypot_enabled
			, us.default_honeypot_class_name
			, us.default_honeypot_input_type
			, us.default_honeypot_hidden_style
		FROM users u
		JOIN user_settings us
			ON u.id = us.user_id
		WHERE
			u.email = $1
			AND u.deleted_at IS NULL
		LIMIT 1
	`;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserHoneypotSettings>(query, [email]);
    });

    return result.rows[0] || null;
};
