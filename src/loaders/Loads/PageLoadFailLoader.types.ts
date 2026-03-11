import { Exception } from '@/utils/exceptions';

export interface PageLoadFailContext {
    pathname: string;
    rawData?: string;
}

export class PageLoadFailError extends Exception {
    private _extra: PageLoadFailContext | null = null;
    private _cause: unknown;

    constructor(
        extra?: PageLoadFailContext | null,
        message?: string,
        cause?: unknown
    ) {
        super(message);

        this._extra = extra || null;
        this._cause = cause;
    }

    get extra(): PageLoadFailContext | null {
        return this._extra;
    }

    get cause(): unknown {
        return this._cause;
    }
}
