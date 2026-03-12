import { htmlPage } from "@server/utils/view";
import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .email("Invalid email address")
        .lowercase("Email addresses must be entered in lowercase"),
});

export const validateForgotPasswordBodyService = () =>
    validator("form", (form, c) => {
        const parsed = forgotPasswordSchema.safeParse(form);
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
