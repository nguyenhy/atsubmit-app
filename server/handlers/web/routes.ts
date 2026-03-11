import { WebHono, WebApiHono } from "@server/types";
import { htmlPage } from "@server/utils/view";

export const registerWebRoutes = (web: WebHono) => {
    web.get("/login", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.get("/signup", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.get("/forgot-password", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.get("/reset-password", async (c) => {
        return c.html(htmlPage(c, {}));
    });
};

export const registerWebApiRoutes = (webApi: WebApiHono) => {
};
