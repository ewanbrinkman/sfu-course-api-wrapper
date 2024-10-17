import wrappers from '../../src/wrappers';
import { EmptyResponseError } from '../../src/errors';

describe('departmentCourseNumbers', () => {
    test('request arch course numbers', async () => {
        const departmentCourseNumbers = await wrappers.departmentCourseNumbers(
            'arch',
            2023,
            'fall',
        );

        departmentCourseNumbers.sort((a, b) => {
            // `localeCompare` will sort strings, since the course number is
            // actually a string. This is because a course number can include
            // letters like a "w" for writing courses. For example, "105w".
            return a.localeCompare(b);
        });

        expect(departmentCourseNumbers).toMatchSnapshot();
    }, 30000);
    test('request course numbers for department that does not exist', async () => {
        await expect(
            wrappers.departmentCourseNumbers('asdf', 2023, 'fall'),
        ).rejects.toThrow(EmptyResponseError);
    }, 30000);
});
