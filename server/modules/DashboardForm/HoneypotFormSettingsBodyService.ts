import { validator } from "hono/validator";
import { z } from "zod";

export const HoneypotFormSettingSchema = z.object({
    enabled: z
        .union([z.literal("on"), z.literal("true"), z.literal("1")])
        .optional()
        .transform((v) => !!v),
    "hidden-style": z.string().max(50).optional(),
    name: z.string().max(64).optional(),
    "hidden-classname": z.string().max(64).optional(),
});

export const honeypotFormSettingBodyService = () =>
    validator("form", (form, c) => {
        return HoneypotFormSettingSchema.safeParse(form);
    });
