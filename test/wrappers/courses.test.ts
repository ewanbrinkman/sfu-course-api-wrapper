import wrappers from '../../src/wrappers';
import Course from '../../src/api/Course';

describe('course', () => {
    test('request cmpt courses', async () => {
        const courses = await wrappers.courses('cmpt');

        courses.sort((a: Course, b: Course) => {
            return a.number.localeCompare(b.number);
        });

        expect(courses).toMatchSnapshot();
    }, 15000);
});
