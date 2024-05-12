import { Promise as BluebirdPromise } from 'bluebird';
import apiConfig from '@config/api.json';

export async function limitConcurrency<T, U>(
    values: T[],
    mapper: (value: T) => Promise<U>
): Promise<U[]> {
    // Add a delay around each request, so the requests aren't spammed.
    const mapperWithRequestInterval = async (value: T) => {
        console.log("Mapper running for value:", value);
        await new Promise(resolve => setTimeout(resolve, apiConfig.requestInterval));
        return mapper(value);
    };

    return await BluebirdPromise.map(values, mapperWithRequestInterval, { concurrency: apiConfig.concurrencyLimit});
}
