export const doFetch = (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
        headers: {
            ...init?.headers,
        },
        ...init,
    });
};
