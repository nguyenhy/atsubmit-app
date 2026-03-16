import { validator } from "hono/validator";
import { z } from "zod";

export const FormGeneralSettingSchema = z.object({
    active: z
        .union([z.literal("on"), z.literal("true"), z.literal("1")])
        .optional()
        .transform((v) => !!v),

    name: z.string().max(255),
});

export const validateFormGeneralSettingService = () => {
    return validator("form", (form, c) => {
        return FormGeneralSettingSchema.safeParse(form);
    });
};
