import { Hono } from "hono";
import { ApiHono, MainHono, WebApiHono, WebHono } from "@server/types";
import { htmlPage } from "@server/utils/view";
import {
    registerWebApiRoutes,
    registerWebRoutes,
} from "@server/handlers/web/routes";
import { registerApiRoutes } from "@server/handlers/api/routes";
import { setupApiRoutes } from "@server/handlers/api/setup";
import { setupWebApiRoutes, setupWebRoutes } from "@server/handlers/web/setup";

const app: MainHono = new Hono();

/**
 * RESPONSE VIEW
 */
const web: WebHono = app.basePath("/");
setupWebRoutes(web);
registerWebRoutes(web);
web.all("*", async (c) => {
    return c.html(htmlPage(c, { httpStatus: 404 }));
});

/**
 * RESPONSE DATA (JSON) FOR VIEW
 */
const webApi: WebApiHono = app.basePath("/webapi");
setupWebApiRoutes(webApi);
registerWebApiRoutes(webApi);
webApi.all("*", async (c) => {
    return c.json(null, 404);
});

/**
 * RESPONSE DATA (JSON) FOR API
 */
const api: ApiHono = app.basePath("/api");
setupApiRoutes(web);
registerApiRoutes(web);
api.all("*", async (c) => {
    return c.json(null, 404);
});

export default app;
