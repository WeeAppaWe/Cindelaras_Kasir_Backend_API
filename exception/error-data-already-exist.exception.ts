export class ErrorDataAlreadyExistException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorDataAlreadyExistException';
        this.message = message;
    }
}
