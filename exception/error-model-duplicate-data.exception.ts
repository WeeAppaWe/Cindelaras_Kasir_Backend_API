export class ErrorModelDuplicateDataException extends Error {
    public data: any;

    constructor(message?: string, data: any = null) {
        super(message || "Data sudah diinputkan");
        this.name = 'ErrorModelDuplicateDataException';
        this.message = message ? message : "Data sudah diinputkan";
        this.data = data;
    }
}
