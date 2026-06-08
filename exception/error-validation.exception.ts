export class ErrorValidationException extends Error {
    public data: any;

    constructor(message: string, data: any = null) {
        super(message);
        this.name = 'ErrorValidationException';
        this.message = message;
        this.data = data;
    }
}
