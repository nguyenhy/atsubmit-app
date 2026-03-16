import { inject } from "vue";
import type { AsyncComponentLoader } from "vue";

export const matchRoute = (
    pathname: string,
    map: Record<string, AsyncComponentLoader>,
): {
    loader: AsyncComponentLoader;
    params: Record<string, string>;
} | null => {
    const path = pathname.replace(/^\/|\/$/g, "");

    for (const pattern in map) {
        const keys: string[] = [];
        const loader = map[pattern];
        if (!loader) {
            continue;
        }

        const regex = new RegExp(
            "^" +
                pattern.replace(/:([a-z0-9_-]+)/g, (_, key) => {
                    keys.push(key);
                    return "([^/]+)";
                }) +
                "$",
        );
        const matches = path.match(regex);

        if (matches) {
            const params: Record<string, string> = {};

            keys.forEach((k, i) => {
                const match = matches[i + 1];
                if (typeof match !== "undefined") {
                    params[k] = match;
                }
            });

            return {
                loader,
                params,
            };
        }
    }

    return null;
};

export type Route = {
    path: string;
    params: Record<string, string>;
    query: Record<string, string>;
};

export const RouteKey = Symbol("route");

export function useRoute(): Route {
    const route = inject<Route>(RouteKey);

    if (!route) {
        throw new Error("useRoute() called without route provider");
    }

    return route;
}
