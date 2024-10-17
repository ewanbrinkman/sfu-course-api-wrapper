import wrappers from '../../src/wrappers';
import { InvalidResponseError } from '../../src/errors';

describe('terms', () => {
    test('request terms for valid year', async () => {
        const terms = await wrappers.terms(2021);
        expect(terms).toMatchSnapshot();
    }, 30000);

    test('request terms for invalid year', async () => {
        await expect(wrappers.terms(1910)).rejects.toThrow(
            InvalidResponseError,
        );
    }, 30000);
});
