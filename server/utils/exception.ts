export class Exception extends Error {
    private _reason?;
    private _code;
    constructor(
        code: string,
        options?: {
            message?: string;
            reason?: unknown;
        }
    ) {
        super(options?.message);
        this._code = code;
        this._reason = options?.reason;
    }

    public get code() {
        return this._code;
    }

    public get reason() {
        return this._reason;
    }

    public toObject() {
        return {
            name: this.name,
            stack: this.stack,
            message: this.message,

            code: this._code,
            reason: this._reason,
        };
    }

    public toString() {
        return JSON.stringify(this.toObject());
    }
}
