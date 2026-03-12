import { validator } from "hono/validator";
import { z } from "zod";

export const honeypotSettingSchema = z.object({
    enabled: z.boolean(),
    hiddenStyle: z.string().max(50),
    name: z.string().max(20).optional(),
    hiddenClassName: z.string().max(64).optional(),
});

export const honeypotSettingBodyService = () =>
    validator("form", (form, c) => {
        return honeypotSettingSchema.safeParse(form);
    });
