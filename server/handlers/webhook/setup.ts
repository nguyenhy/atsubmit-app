import { ContentfulStatusCode } from "hono/utils/http-status";
import { HTTPException } from "hono/http-exception";

import { ApiHono } from "@server/types";
import { Exception } from "@server/utils/exception";

export const setupWebhookRoutes = (api: ApiHono) => {
    api.onError(async (error, c) => {
        let status: ContentfulStatusCode = 500;
        if (error instanceof HTTPException) {
            console.error(
                c,
                "onError.HTTPException",
                error.status,
                error.stack || error.message,
            );
            status = error.status;
        } else if (error instanceof Exception) {
            console.error(c, "onError.Exception", error.toObject());
        } else {
            console.error(c, "onError.Error", error.stack || error.message);
        }

        return c.json({}, status);
    });
};
