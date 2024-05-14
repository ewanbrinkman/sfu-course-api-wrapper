import apiConfig from '@config/api.json';
import { Course } from '@api';

export async function limitConcurrency<T, U>(
    values: T[],
    mapper: (value: T) => Promise<U>
): Promise<U[]> {
    // console.log(values);
    const results: U[] = [];
    let currentIndex = 0;
    const inFlightPromises: Promise<void>[] = [];

    const processNext = async () => {
        const value = values.shift();
        if (!value) {
            return;
        }

        console.log(value);

        const result = await mapper(value);
        results.push(result);
        console.log(`result before (${(value as unknown as {value: string}).value}):`, (results as unknown as Course[]).map(obj => obj.number), `results after (${(value as unknown as {value: string}).value}):`, (results as unknown as Course[]).map(obj => obj.number));

        if (values.length > 0) {
            await new Promise(resolve => setTimeout(resolve, apiConfig.requestInterval));
            await processNext();
        }
    };

    while (inFlightPromises.length < apiConfig.concurrencyLimit && currentIndex < values.length) {
        const promise = processNext();
        inFlightPromises.push(promise);
        currentIndex++;
    }

    await Promise.all(inFlightPromises);

    // console.log("RESULT", results);

    return results;
}
