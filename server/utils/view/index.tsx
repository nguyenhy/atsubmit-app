import { html, raw } from 'hono/html';
import { MainContext } from '@server/types';
import script from '@server/utils/view/script.html?raw'
import { META_OF_PAGE } from './meta';

export interface HTMLPageOptions {
    httpStatus?: number
    documentPage?: string
    documentTitle?: string
    documentDescription?: string
    documentImage?: string
    context?: Record<string, unknown>;
}

const DEFAULT_TITLE = 'At Submit - Forms that just work. No backend required.'
const DEFAULT_DESCRIPTION = 'Handle form submissions without building a backend.'
const DEFAULT_IMAGE = 'https://app.atsubmit.com/background.svg'

export const htmlPage = (c: MainContext, options?: HTMLPageOptions) => {
    const hmr = c.env.APP_ENV === 'production' ? false : true;
    const context = options?.context;

    const httpStatus = options?.httpStatus ?? c.res.status

    const url = (new URL(c.req.url, c.env.APP_PUBLIC_ENDPOINT))
    const accessURL = url.toString()
    const urlMeta = META_OF_PAGE[url.pathname]

    const page = options?.documentPage || (urlMeta ? urlMeta.title : '');
    const title = options?.documentTitle || (page ? `${page} | ${DEFAULT_TITLE}` : DEFAULT_TITLE);
    const description = options?.documentDescription || (urlMeta ? urlMeta.description : DEFAULT_DESCRIPTION);
    const image = options?.documentImage || DEFAULT_IMAGE;


    const output = (
        <>
            {html`<!DOCTYPE html>`}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <link rel="icon" href="https://atsubmit.com/favicon/favicon.ico" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />

                    {/* Canonical URL */}
                    <link rel="canonical" href={accessURL} />

                    {/* Primary Meta Tags */}
                    <title>{title}</title>
                    <meta name="description" content={description} />

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={accessURL} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={image} />

                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={accessURL} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={description} />
                    <meta property="twitter:image" content={image} />

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

export const dynamicLoadView = (view: string) => {
    return html`${raw(script.replace('{{VIEW_NAME}}', view))}`
}