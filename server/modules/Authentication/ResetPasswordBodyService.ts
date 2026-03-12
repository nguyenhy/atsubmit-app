import { htmlPage } from "@server/utils/view";
import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

export const resetPasswordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number");

export const resetConfirmPasswordSchema = z
    .string()
    .min(8, "Please confirm your password");

export const resetSchema = z
    .object({
        token: z.string(),
        password: resetPasswordSchema,
        "confirm-password": resetConfirmPasswordSchema,
    })
    .refine((data) => data.password === data["confirm-password"], {
        path: ["confirm-password"],
        message: "Passwords do not match",
    });

export const validateResetBodyService = () =>
    validator("form", (form, c) => {
        const parsed = resetSchema.safeParse(form);
        if (!parsed.success) {
            return c.html(
                htmlPage(c, {
                    context: {
                        error: zodErrorsToJson(parsed.error),
                    },
                }),
            );
        }

        return parsed.data;
    });
