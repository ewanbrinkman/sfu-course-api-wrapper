import wrappers from '../../src/wrappers';

describe('course', () => {
    test('request cmpt courses', async () => {
        const departmentCourses = await wrappers.departmentCourses(
            'arch',
            2023,
            'fall',
        );

        departmentCourses.sort((a, b) => {
            // `localeCompare` will sort strings, since the course number is
            // actually a string. This is because a course number can include
            // letters like a "w" for writing courses. For example, "105w".
            return a.number.localeCompare(b.number);
        });

        expect(departmentCourses).toMatchSnapshot();
    }, 30000);
});
