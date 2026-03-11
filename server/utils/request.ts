import { Context } from 'hono';

export const wantJson = (c: Context) => {
    return (
        (c.req.header('Accept') || '').includes('json') ||
        (c.req.header('Content-Type') || '').includes('json')
    );
};
