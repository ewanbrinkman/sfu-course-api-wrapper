import wrappers from '../../src/wrappers';

describe('terms', () => {
    test('request terms', async () => {
        const terms = await wrappers.terms(2021);
        expect(terms).toMatchSnapshot();
    }, 30000);
});
