export class ErrorCodeException extends Error {
    public data: any;

    constructor(message: string, data: any = {}) {
        super(message);
        this.name = 'ErrorCodeException';
        this.message = message;
        this.data = data;
    }
}
