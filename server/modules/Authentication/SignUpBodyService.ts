import { htmlPage } from "@server/utils/view";
import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

export const signupPasswordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number");

export const signupConfirmPasswordSchema = z
    .string()
    .min(8, "Please confirm your password");

export const signupSchema = z
    .object({
        email: z
            .email("Invalid email address")
            .lowercase("Email addresses must be entered in lowercase"),
        password: signupPasswordSchema,
        'confirm-password': signupConfirmPasswordSchema,
    })
    .refine((data) => data.password === data['confirm-password'], {
        path: ["confirm_password"],
        message: "Passwords do not match",
    });

export const validateSignUpBodyService = () =>
    validator("form", (form, c) => {
        const parsed = signupSchema.safeParse(form);
        if (!parsed.success) {
            return c.html(
                htmlPage(c, {
                    context: {
                        email: form.email,
                        error: zodErrorsToJson(parsed.error),
                    },
                }),
            );
        }

        return parsed.data;
    });
