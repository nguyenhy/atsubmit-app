import {
    createApp,
    defineAsyncComponent,
    type AsyncComponentLoader,
} from "vue";
import {
    Error404ViewAsyncLoader,
    Error500ViewAsyncLoader,
    ErrorViewAsyncLoader,
    PageLoadFailViewAsyncLoader,
    PageLoadingViewAsyncLoader,
    PATH_MAP,
} from "./router";
import { PageLoadFailError } from "../../loaders/Loads/PageLoadFailLoader.types";
import { getSupportedHttpStatusProp } from "@/loaders/Error/HttpStatusLoader.const";
import { initTheme } from "../theme";

export const mount = async ($container: HTMLDivElement, pathname: string) => {
    const rawHttpStatus = $container.getAttribute("data-status");
    // $container.removeAttribute("data-status");

    const rawContext = $container.getAttribute("data-context");
    // $container.removeAttribute("data-context");

    initTheme();

    let loader: AsyncComponentLoader | null = null;
    let props: Record<string, unknown> | null = null;

    const name = pathname
        // remove tail slash
        .replace(/\/$/, "")
        // remove front slash
        .replace(/^\//, "");

    const errorProps = rawHttpStatus
        ? getSupportedHttpStatusProp(rawHttpStatus)
        : null;
    if (errorProps) {
        try {
            props = {
                code: errorProps.code,
                title: errorProps.title,
                description: errorProps.description,
                action: errorProps.action,
            };
            loader = ErrorViewAsyncLoader;
        } catch (error) {
            props = {
                error: error,
                rawData: rawContext,
            };
            loader = Error500ViewAsyncLoader;
        }
    } else {
        const ViewAsyncLoader = PATH_MAP[name];
        if (ViewAsyncLoader) {
            if (rawContext) {
                try {
                    props = JSON.parse(rawContext);
                    loader = ViewAsyncLoader;
                } catch (error) {
                    props = {
                        error: error,
                        rawData: rawContext,
                    };
                    loader = Error500ViewAsyncLoader;
                }
            } else {
                loader = ViewAsyncLoader;
            }
        }
    }

    if (!loader) {
        loader = Error404ViewAsyncLoader;
        props = {
            path: name,
        };
    }

    // wrapper loader to add error data
    const safeLoader: AsyncComponentLoader = async () => {
        try {
            return await loader();
        } catch (err) {
            throw new PageLoadFailError(
                {
                    pathname: pathname,
                    rawData: rawContext || undefined,
                },
                undefined,
                err,
            );
        }
    };

    const RootComponent = defineAsyncComponent({
        loader: safeLoader,
        loadingComponent: {
            template: PageLoadingViewAsyncLoader,
        },
        errorComponent: defineAsyncComponent(PageLoadFailViewAsyncLoader),
    });

    const app = createApp(RootComponent, props);
    app.mount($container);
};
