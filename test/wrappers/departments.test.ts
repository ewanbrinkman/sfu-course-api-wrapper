import wrappers from '../../src/wrappers';
import { EmptyResponseError } from '../../src/errors';

describe('departments', () => {
    test('request departments', async () => {
        const departments = await wrappers.departments(2022, 'fall');
        expect(departments).toMatchSnapshot();
    }, 30000);
    test('request departments from an invalid year and term combination', async () => {
        await expect(wrappers.departments(3, 'fall')).rejects.toThrow(
            EmptyResponseError,
        );
    }, 30000);
});
