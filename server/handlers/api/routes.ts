import { createClient } from "@server/db/connection";
import { ApiHono } from "@server/types";

export const registerApiRoutes = (api: ApiHono) => {
    api.get("/api", async (c) => {
        const client = await createClient(c);
        const result = await client.query<{ now: string }>(
            "SELECT NOW() as now",
        );
        return c.json(result.rows);
    });
};
