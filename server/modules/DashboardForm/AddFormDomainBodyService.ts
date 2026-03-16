import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { addDomainSchema } from "../DashboardDomainSettings/AddDefaultDomainBodyService";

export const addFormDomainBodyService = () =>
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
