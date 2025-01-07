import wrappers from '../../src/wrappers';

describe('departments', () => {
    test('request departments', async () => {
        const departments = await wrappers.departments(2022, 'fall');
        expect(departments).toMatchSnapshot();
    }, 30000);
    test('request departments from an invalid year and term combination', async () => {
        const departments = await wrappers.departments(3, 'fall');

        expect(departments).toEqual([]);
    }, 30000);
});
