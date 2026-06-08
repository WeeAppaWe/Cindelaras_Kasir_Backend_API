export class ErrorAuthenticationException extends Error {
    public data: any;

    constructor(message: string, data: any = null) {
        super(message);
        this.name = 'ErrorAuthenticationException';
        this.message = message;
        this.data = data;
    }
}
