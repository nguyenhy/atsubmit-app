import { zodErrorsToJson } from "@server/utils/zod/error";
import { validator } from "hono/validator";
import { deleteDomainSchema } from "../DashboardDomainSettings/DeleteDefaultDomainBodyService";

export const deleteFormDomainBodyService = () =>
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
