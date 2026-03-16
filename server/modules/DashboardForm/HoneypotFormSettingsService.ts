import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserHoneypotSettings } from "../Authentication/UserSettings";
import { FormHoneypotSettings } from "../Form";

export const getHoneypotFormSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        id: string;
    },
) => {
    const query = `
		SELECT
			honeypot_enabled
			, honeypot_class_name
			, honeypot_input_name
			, honeypot_hidden_style
		FROM forms
		WHERE
			user_id = $1
			AND id = $2
		LIMIT 1
	`;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<FormHoneypotSettings>(query, [
            data.user_id,
            data.id,
        ]);
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
			honeypot_enabled,
			honeypot_class_name,
			honeypot_input_name,
			honeypot_hidden_style,
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
			honeypot_enabled =
				COALESCE(EXCLUDED.honeypot_enabled, user_settings.honeypot_enabled),

			honeypot_class_name =
				COALESCE(EXCLUDED.honeypot_class_name, user_settings.honeypot_class_name),

			honeypot_input_name =
				COALESCE(EXCLUDED.honeypot_input_name, user_settings.honeypot_input_name),

			honeypot_hidden_style =
				COALESCE(EXCLUDED.honeypot_hidden_style, user_settings.honeypot_hidden_style),

			updated_at = now()

		WHERE
			user_settings.honeypot_enabled          IS DISTINCT FROM COALESCE(EXCLUDED.honeypot_enabled, user_settings.honeypot_enabled)
		OR user_settings.honeypot_class_name      IS DISTINCT FROM COALESCE(EXCLUDED.honeypot_class_name, user_settings.honeypot_class_name)
		OR user_settings.honeypot_input_name      IS DISTINCT FROM COALESCE(EXCLUDED.honeypot_input_name, user_settings.honeypot_input_name)
		OR user_settings.honeypot_hidden_style    IS DISTINCT FROM COALESCE(EXCLUDED.honeypot_hidden_style, user_settings.honeypot_hidden_style)
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

export const updateHoneyPotFormSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        id: string;
        enabled: boolean;
        name?: string;
        hiddenStyle?: string;
        hiddenClassName?: string;
    },
) => {
    const query = `
		UPDATE forms
		SET
			honeypot_enabled =
				COALESCE($3, honeypot_enabled),

			honeypot_class_name =
				COALESCE($4, honeypot_class_name),

			honeypot_input_name =
				COALESCE($5, honeypot_input_name),

			honeypot_hidden_style =
				COALESCE($6, honeypot_hidden_style),

			updated_at = now()
		WHERE
			user_id = $1
			AND id = $2
			AND (
				honeypot_enabled 			IS DISTINCT FROM COALESCE($3, honeypot_enabled)
				OR honeypot_class_name 		IS DISTINCT FROM COALESCE($4, honeypot_class_name)
				OR honeypot_input_name 		IS DISTINCT FROM COALESCE($5, honeypot_input_name)
				OR honeypot_hidden_style 	IS DISTINCT FROM COALESCE($6, honeypot_hidden_style)
			);
	`;

    const params = [
        data.user_id,
        data.id,
        !!data.enabled,
        data.hiddenClassName ?? null,
        data.name ?? null,
        data.hiddenStyle ?? null,
    ];
    console.log(params);

    return await lazyPoolExecute(c, async (client) => {
        return client.query(query, params);
    });
};
