import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { FormNotificationSettings } from "../Form";

export const getFormNotificationSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        slug: string;
    },
) => {
    const query = `
		SELECT
			  notification_enabled
			, notification_frequency
			, notification_via_email
			, notification_email_recipients
		FROM forms
		WHERE
			user_id = $1
			AND endpoint_slug = $2
		LIMIT 1
	`;
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<FormNotificationSettings>(query, [
            data.user_id,
            data.slug,
        ]);
    });

    return result.rows[0] || null;
};
