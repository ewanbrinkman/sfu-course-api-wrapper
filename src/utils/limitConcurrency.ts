import { Promise as BluebirdPromise } from 'bluebird';

export async function limitConcurrency<T, U>(
    values: T[],
    mapper: (value: T) => Promise<U>,
    concurrencyLimit: number,
): Promise<U[]> {
    return await BluebirdPromise.map(values, mapper, { concurrency: concurrencyLimit});
}
