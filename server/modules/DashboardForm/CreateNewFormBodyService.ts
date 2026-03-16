import { htmlPage } from "@server/utils/view";
import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

export const createNewFormBodyServiceSchema = z.object({
    name: z.string().max(255),
});

export const createNewFormBodyService = () => {
    return validator("form", (form, c) => {
        const parsed = createNewFormBodyServiceSchema.safeParse(form);
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
};
