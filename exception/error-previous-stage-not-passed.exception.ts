export class ErrorPreviousStageNotPassed extends Error {
    constructor(message?: string) {
        super(message || "All previous stage status must be passed!");
        this.name = 'ErrorPreviousStageNotPassed';
        this.message = message ? message : "All previous stage status must be passed!";
    }
}
