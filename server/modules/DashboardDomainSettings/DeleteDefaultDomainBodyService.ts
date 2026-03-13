import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";
import { domainListString } from "./AddDefaultDomainBodyService";

export const deleteDomainSchema = z
    .object({
        allow: domainListString.optional(),
        disallow: domainListString.optional(),
    })
    .refine(
        (data) => {
            return !!data.allow || !!data.disallow;
        },
        {
            message: "Please provide at least one domain to delete.",
        },
    );

export const deleteDefaultDomainBodyService = () =>
    validator("json", async (_, c) => {
        const json = await c.req.json();

        const parsed = deleteDomainSchema.safeParse(json);
        if (!parsed.success) {
            return c.json({
                error: zodErrorsToJson(parsed.error),
            });
        }

        return parsed.data;
    });
