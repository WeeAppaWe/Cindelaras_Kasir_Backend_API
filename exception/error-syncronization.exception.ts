export class ErrorSyncronization extends Error {
    constructor(message?: string) {
        super(message || "Synchronization failed!");
        this.name = 'ErrorSyncronization';
        this.message = message ? message : "Synchronization failed!";
    }
}
