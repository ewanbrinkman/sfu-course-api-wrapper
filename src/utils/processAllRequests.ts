export async function processAllRequests<T, U>(
    values: T[],
    mapper: (value: T) => Promise<U>,
): Promise<U[]> {
    // If `Promise.all` is used, it actually runs slower. I think this is because it overloads the API.
    const results: U[] = [];
    for await (const value of values) {
        results.push(await mapper(value));
    }
    return results;
}
