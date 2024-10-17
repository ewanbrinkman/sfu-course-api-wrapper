export default class InvalidResponseError extends Error {
    constructor(errorCode: number, url: string) {
        super(`API returned ${errorCode} error when requesting: ${url}`);
        this.name = 'InvalidResponseError';
    }
}
