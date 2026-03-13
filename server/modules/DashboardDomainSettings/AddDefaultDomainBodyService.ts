import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { z } from "zod";

const domainGlobRegex = /^(?:\*\.)?([a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;

export const domainListString = z
    .string()
    .trim()
    .lowercase()
    .refine((domain) => domainGlobRegex.test(domain), {
        message: "Invalid domain format. Use example.com or *.example.com",
    });

export const addDomainSchema = z
    .object({
        allow: domainListString.optional(),
        disallow: domainListString.optional(),
    })
    .refine(
        (data) => {
            return !!data.allow || !!data.disallow;
        },
        {
            message: "Please provide at least one domain to add.",
        },
    );

export const addDefaultDomainBodyService = () =>
    validator("json", async (_, c) => {
        const json = await c.req.json();

        const parsed = addDomainSchema.safeParse(json);
        if (!parsed.success) {
            return c.json({
                error: zodErrorsToJson(parsed.error),
            });
        }

        return parsed.data;
    });
