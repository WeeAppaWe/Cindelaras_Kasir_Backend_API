export class ErrorLimitException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorLimitException';
        this.message = message;
    }
}
