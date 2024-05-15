import wrappers from '../../src/wrappers';

describe('years', () => {
    test('request years', async () => {
        const years = await wrappers.years();
        expect(years).toMatchSnapshot();
    }, 30000);
});
