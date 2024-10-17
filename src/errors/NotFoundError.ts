export default class NotFoundError extends Error {
    constructor(search: string) {
        super(`The search for ${search} didn't return anything.`);
        this.name = 'NotFoundError';
    }
}
