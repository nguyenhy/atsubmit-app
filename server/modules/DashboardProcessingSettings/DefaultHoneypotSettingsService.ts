import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserHoneypotSettings } from "../Authentication/UserSettings";

export const getDefaultHoneypotFormSetting = async (
    c: MainContext,
    user_id: string,
) => {
    const query = `
		SELECT
			us.default_honeypot_enabled
			, us.default_honeypot_class_name
			, us.default_honeypot_input_name
			, us.default_honeypot_hidden_style
		FROM user_settings us
		WHERE
			us.user_id = $1
		LIMIT 1
	`;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserHoneypotSettings>(query, [user_id]);
    });

    return result.rows[0] || null;
};

export const upsertUserHoneyPotSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        enabled: boolean;
        name?: string;
        hiddenStyle?: string;
        hiddenClassName?: string;
    },
) => {
    const query = `
		INSERT INTO user_settings (
			user_id,
			default_honeypot_enabled,
			default_honeypot_class_name,
			default_honeypot_input_name,
			default_honeypot_hidden_style,
			updated_at
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5,
			now()
		)
		ON CONFLICT (user_id)
		DO UPDATE
		SET
			default_honeypot_enabled =
				COALESCE(EXCLUDED.default_honeypot_enabled, user_settings.default_honeypot_enabled),

			default_honeypot_class_name =
				COALESCE(EXCLUDED.default_honeypot_class_name, user_settings.default_honeypot_class_name),

			default_honeypot_input_name =
				COALESCE(EXCLUDED.default_honeypot_input_name, user_settings.default_honeypot_input_name),

			default_honeypot_hidden_style =
				COALESCE(EXCLUDED.default_honeypot_hidden_style, user_settings.default_honeypot_hidden_style),

			updated_at = now()

		WHERE
			user_settings.default_honeypot_enabled          IS DISTINCT FROM COALESCE(EXCLUDED.default_honeypot_enabled, user_settings.default_honeypot_enabled)
		OR user_settings.default_honeypot_class_name      IS DISTINCT FROM COALESCE(EXCLUDED.default_honeypot_class_name, user_settings.default_honeypot_class_name)
		OR user_settings.default_honeypot_input_name      IS DISTINCT FROM COALESCE(EXCLUDED.default_honeypot_input_name, user_settings.default_honeypot_input_name)
		OR user_settings.default_honeypot_hidden_style    IS DISTINCT FROM COALESCE(EXCLUDED.default_honeypot_hidden_style, user_settings.default_honeypot_hidden_style)
		;
`;

    const params = [
        data.user_id,
        !!data.enabled,
        data.hiddenClassName ?? null,
        data.name ?? null,
        data.hiddenStyle ?? null,
    ];

    return await lazyPoolExecute(c, async (client) => {
        return client.query(query, params);
    });
};
