import { WebhookHono } from "@server/types";

export const registerWebhookRoutes = (webhook: WebhookHono) => {
    const aws = webhook.basePath("/aws");
    aws.get(
        "/ses/0ba971ed74210dad183e1d71d63c33",
        async (c) => {
            console.log(c.get("reqId"), await c.req.text());
            return c.json(null, 200);
        },
    );
};
