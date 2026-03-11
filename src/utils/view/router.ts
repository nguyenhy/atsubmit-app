import type { AsyncComponentLoader } from "vue";

export const PageLoadingViewAsyncLoader = () =>
    import("@/loaders/Loads/PageLoadingLoader.vue");
export const PageLoadFailViewAsyncLoader = () =>
    import("@/loaders/Loads/PageLoadFailLoader.vue");
export const Error404ViewAsyncLoader = () =>
    import("@/loaders/Error/404Loader.vue");
export const Error500ViewAsyncLoader = () =>
    import("@/loaders/Error/500Loader.vue");
export const ErrorViewAsyncLoader = () =>
    import("@/loaders/Error/HttpStatusLoader.vue");

export const HomeViewAsyncLoader = () => import("@/loaders/HomeLoader.vue");
export const LoginViewAsyncLoader = () => import("@/loaders/LoginLoader.vue");
export const SignUpViewAsyncLoader = () => import("@/loaders/SignUpLoader.vue");
export const ForgotPasswordViewAsyncLoader = () =>
    import("@/loaders/ForgotPasswordLoader.vue");
export const ResetPasswordPageAsyncLoader = () =>
    import("@/loaders/ResetPasswordLoader.vue");
export const ResetPasswordSuccessPageAsyncLoader = () =>
    import("@/loaders/ResetPasswordSuccessLoader.vue");

export const HTTP_STATUS_MAP: Record<string, AsyncComponentLoader> = {
    "404": Error404ViewAsyncLoader,
    "500": Error500ViewAsyncLoader,
};

/**
 * key has:
 * - no front slash
 * - no tail slash
 */
export const PATH_MAP: Record<string, AsyncComponentLoader> = {
    "": HomeViewAsyncLoader,
    login: LoginViewAsyncLoader,
    signup: SignUpViewAsyncLoader,
    "forgot-password": ForgotPasswordViewAsyncLoader,
    "reset-password": ResetPasswordPageAsyncLoader,
    "reset-password-success": ResetPasswordSuccessPageAsyncLoader,
};
