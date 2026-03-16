import { validator } from "hono/validator";
import { updateNotificationSettingSchema } from "../DashboardNotificationSettings/UpdateDefaultNotificationBodySetting";

export const updateFormNotificationBodyService = () =>
    validator("form", (form, c) => {
        return updateNotificationSettingSchema.safeParse(form);
    });
