export class ErrorNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorNotFoundException';
        this.message = message;
    }
}
