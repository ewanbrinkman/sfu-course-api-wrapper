export default class EmptyResponseError extends Error {
    constructor(url: string) {
        super(`API returned empty list when requesting: ${url}`);
        this.name = 'EmptyResponseError';
    }
}
