export class ErrorQueryException extends Error {
    public data: any;

    constructor(message: string, data: any = {}) {
        super(message);
        this.name = 'ErrorQueryException';
        this.message = message;
        this.data = data;
    }
}
