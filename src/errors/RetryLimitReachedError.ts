export default class RetryLimitReachedError extends Error {
    constructor(maxAttempts: number, url: string) {
        super(`Retry limit (${maxAttempts}) reached for: ${url}`);
        this.name = 'RetryLimitReachedError';
    }
}
