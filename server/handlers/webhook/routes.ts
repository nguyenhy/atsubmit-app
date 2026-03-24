import { WebhookHono } from "@server/types";

export const registerWebhookRoutes = (webhook: WebhookHono) => {
    const aws = webhook.basePath("/aws");
    aws.get("ses", async (c) => {
        console.log(c.get("reqId"), await c.req.text());
        return c.json(null, 200);
    });
};
