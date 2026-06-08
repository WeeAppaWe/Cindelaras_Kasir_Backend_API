export class ErrorInvalidParameterException extends Error {
    public data: any;

    constructor(message?: string, data: any = null) {
        super(message || "Invalid parameter!");
        this.name = 'ErrorInvalidParameterException';
        this.message = message ? message : "Invalid parameter!";
        this.data = data;
    }
}
