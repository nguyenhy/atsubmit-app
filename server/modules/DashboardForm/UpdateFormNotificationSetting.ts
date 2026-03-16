import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { FormNotificationSettings } from "../Form";

export const updateFormNotificationSetting = async (
    c: MainContext,
    data: {
        user_id: string;
        id: string;
        enabled?: boolean;
        via_email?: boolean;
        frequency?: string | null;
        email_recipients?: string[];
    },
) => {
    const query = `
        UPDATE forms
        SET
            notification_enabled =
                COALESCE($3, notification_enabled),

            notification_frequency =
                COALESCE($4, notification_frequency),

            notification_via_email =
                COALESCE($5, notification_via_email),

            notification_email_recipients =
                COALESCE($6, notification_email_recipients),

            updated_at = now()
        WHERE
            user_id = $1
            AND id = $2

        RETURNING
            notification_enabled,
            notification_frequency,
            notification_via_email,
            notification_email_recipients;
    `;
    const params = [
        data.user_id,
        data.id,
        !!data.enabled,
        data.frequency ?? null,
        !!data.via_email,
        data.email_recipients ?? null,
    ];

    return await lazyPoolExecute(c, async (client) => {
        return client.query<FormNotificationSettings>(query, params);
    });
};
