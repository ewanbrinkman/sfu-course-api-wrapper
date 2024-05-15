import wrappers from '../../src/wrappers';

describe('departments', () => {
    test('request departments', async () => {
        const departments = await wrappers.departments(2022, 'fall');
        expect(departments).toMatchSnapshot();
    }, 30000);
});
