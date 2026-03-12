import { htmlPage } from "@server/utils/view";
import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

export const resetSchema = z.object({
    token: z.string(),
});

export const validateResetPasswordQueryService = () =>
    validator("query", (form, c) => {
        const parsed = resetSchema.safeParse(form);
        if (!parsed.success) {
            return c.html(
                htmlPage(c, {
                    httpStatus: 404,
                }),
            );
        }

        return parsed.data;
    });
