import { html, raw } from 'hono/html';
import { MainContext } from '@server/types';
import script from '@server/utils/view/script.html?raw'

export interface HTMLPageOptions {
    httpStatus?: number
    documentTitle?: string
    context?: Record<string, unknown>;
}
export const htmlPage = (c: MainContext, options?: HTMLPageOptions) => {
    const hmr = c.env.APP_ENV === 'production' ? false : true;
    const httpStatus = options?.httpStatus ?? c.res.status

    const context = options?.context;
    const title = options?.documentTitle || '';
    const output = (
        <>
            {html`<!DOCTYPE html>`}
            <html lang="en">
                <head>
                    {sharedHeaderTags()}
                    <title>{title}</title>
                    {!!hmr && (
                        <>
                            <script
                                type="module"
                                src="/@id/virtual:vue-devtools-path:overlay.js"
                            ></script>
                            <script
                                type="module"
                                src="/@id/virtual:vue-inspector-path:load.js"
                            ></script>
                            <script type="module" src="/@vite/client"></script>
                        </>
                    )}
                </head>
                <body>
                    {html`<div id="app" data-status="${JSON.stringify(httpStatus)}" data-context="${context ? JSON.stringify(context) : ''}"></div>`}
                    {
                        hmr
                            ? (
                                <script type="module" src="/src/main.ts"></script>
                            )
                            : (
                                dynamicLoadView('index.html')
                            )
                    }
                </body>
            </html>
        </>

    );
    return safeMinify(output.toString());
};

export const safeMinify = (html: string): string => {
    return html
        .replace(/>\s+</g, '><') //  trim between tags
        .replace(/\n+/g, '') //      remove newlines
        .replace(/\s{2,}/g, ' '); // reduce multiple spaces
};

export const sharedHeaderTags = () => {
    return (
        <>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </>
    );
};

export const dynamicLoadView = (view: string) => {
    return html`${raw(script.replace('{{VIEW_NAME}}', view))}`
}