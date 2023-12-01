import courses from '../../src/wrappers/courses';
import Course from '../../src/api/Course';

describe('course', () => {
    test('request cmpt courses', async () => {
        const coursesData = await courses('cmpt');

        coursesData.sort((a: Course, b: Course) => {
            return a.number.localeCompare(b.number);
        });

        expect(coursesData).toMatchSnapshot();
    }, 15000);
});
