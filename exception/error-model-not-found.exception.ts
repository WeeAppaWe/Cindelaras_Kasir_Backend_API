export class ErrorModelNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorModelNotFoundException';
        this.message = message;
    }
}
