import { validateForgotPasswordBodyService } from "@server/modules/Authentication/ForgotPasswordBodyService";
import {
    insertPasswordResetTokenRecord,
    verifyCanResetPassword,
} from "@server/modules/Authentication/ForgotPasswordService";
import { validateLoginBodyService } from "@server/modules/Authentication/LoginBodyService";
import { matchLoginCredentailService } from "@server/modules/Authentication/LoginCredentialService";
import { validateResetBodyService } from "@server/modules/Authentication/ResetPasswordBodyService";
import { validateResetPasswordQueryService } from "@server/modules/Authentication/ResetPasswordQueryService";
import {
    resetPasswordService,
    verifyCanResetPasswordWithEmail,
} from "@server/modules/Authentication/ResetPasswordService";
import {
    noSessionRequiredMiddleware,
    sessionRequiredMiddleware,
} from "@server/modules/Authentication/sessionMiddleware";
import { validateSignUpBodyService } from "@server/modules/Authentication/SignUpBodyService";
import {
    emailSignupService,
    verifyCanSignUpWithEmail,
} from "@server/modules/Authentication/SignUpService";
import { deleteSessionCookie } from "@server/modules/Session/CookieService";
import { deleteSessionService } from "@server/modules/Session/SessionService";
import { saveUserSessionService } from "@server/modules/Session/UserSessionService";
import { WebHono, WebApiHono } from "@server/types";
import { htmlPage } from "@server/utils/view";
import { randomBytes } from "node:crypto";

export const registerWebRoutes = (web: WebHono) => {
    web.get("/logout", sessionRequiredMiddleware("/login"), async (c) => {
        try {
            const sid = c.get("sid");
            if (sid) {
                await deleteSessionCookie(c);
                await deleteSessionService(c, sid);

                c.set("sid", "");
            }
        } catch (error) {
            console.error(c.get("reqId"), error);
        }

        return c.redirect("/login");
    });

    web.get("/login", noSessionRequiredMiddleware("/dashboard"), async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.post(
        "/login",
        noSessionRequiredMiddleware("/dashboard"),
        validateLoginBodyService(),
        async (c) => {
            const form = c.req.valid("form");
            try {
                const user = await matchLoginCredentailService(c, {
                    email: form.email,
                    password: form.password,
                });
                if (user) {
                    await saveUserSessionService(c, user, {
                        remember: form.remember,
                    });

                    return c.redirect("/dashboard");
                }

                return c.html(
                    htmlPage(c, {
                        context: {
                            email: form.email,
                            error: "Incorrect username or password.",
                        },
                    }),
                );
            } catch (error) {
                console.error(c.get("reqId"), error);
                return c.html(
                    htmlPage(c, {
                        context: {
                            email: form.email,
                            error: "Something went wrong. Please try again later.",
                        },
                    }),
                );
            }
        },
    );

    web.get("/signup", noSessionRequiredMiddleware("/dashboard"), async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.post(
        "/signup",
        noSessionRequiredMiddleware("/dashboard"),
        validateSignUpBodyService(),
        async (c) => {
            const form = c.req.valid("form");
            try {
                const canUse = await verifyCanSignUpWithEmail(c, form.email);
                if (!canUse) {
                    return c.html(
                        htmlPage(c, {
                            context: {
                                error: "This email is already registered.",
                            },
                        }),
                    );
                }

                await emailSignupService(c, form);

                return c.html(
                    htmlPage(c, {
                        context: {
                            email: form.email,
                        },
                    }),
                );
            } catch (error) {
                console.error(c.get("reqId"), error);
                return c.html(
                    htmlPage(c, {
                        context: {
                            email: form.email,
                            error: "Something went wrong. Please try again later.",
                        },
                    }),
                );
            }
        },
    );

    web.get("/forgot-password-submitted", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.get("/forgot-password", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.post(
        "/forgot-password",
        validateForgotPasswordBodyService(),
        async (c) => {
            try {
                const form = c.req.valid("form");
                const canUse = await verifyCanResetPassword(c, form.email);
                if (canUse) {
                    const token = randomBytes(32).toString("hex");
                    const url = new URL(
                        "reset-password",
                        c.env.APP_PUBLIC_ENDPOINT,
                    );
                    url.searchParams.set("token", token);

                    await insertPasswordResetTokenRecord(c, {
                        email: form.email,
                        token: token,
                    });

                    console.log("========================");
                    console.log("RESET URL", url.toString());
                    console.log("========================");
                }

                return c.redirect("/forgot-password-submitted");
            } catch (error) {
                console.error(c.get("reqId"), error);

                return c.html(htmlPage(c, { httpStatus: 500 }));
            }
        },
    );

    web.get("/reset-password-used", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    web.get(
        "/reset-password",
        validateResetPasswordQueryService(),
        async (c) => {
            const query = c.req.valid("query");
            const user = await verifyCanResetPasswordWithEmail(c, query.token);
            if (!user) {
                return c.redirect("/reset-password-used");
            }

            return c.html(
                htmlPage(c, {
                    context: {
                        email: user.email,
                    },
                }),
            );
        },
    );
    web.post("/reset-password", validateResetBodyService(), async (c) => {
        const form = c.req.valid("form");
        const user = await verifyCanResetPasswordWithEmail(c, form.token);
        if (!user) {
            return c.redirect("/reset-password-used");
        }

        const result = await resetPasswordService(c, {
            password: form.password,
            user_id: user.id,
        });
        console.log("result", result);

        return c.redirect("/reset-password-success");
    });

    const dashboard = web.basePath("/dashboard");
    dashboard.use("*", sessionRequiredMiddleware("/login"));
    dashboard.get("/", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/forms", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/submissions", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/settings", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/settings/profile", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/settings/processing", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/settings/domains", async (c) => {
        return c.html(htmlPage(c, {}));
    });
    dashboard.get("/settings/notifications", async (c) => {
        return c.html(htmlPage(c, {}));
    });
};

export const registerWebApiRoutes = (webApi: WebApiHono) => {};
