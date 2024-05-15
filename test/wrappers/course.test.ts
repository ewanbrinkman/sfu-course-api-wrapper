import wrappers from '../../src/wrappers';
import { CourseSection } from '../../src/api';

describe('course', () => {
    test('request cmpt 125 fall 2022', async () => {
        const course = await wrappers.course('cmpt', '125', 2022, 'fall');

        expect(course).toMatchSnapshot();
    });
    test('get course section', async () => {
        const course = await wrappers.course('cmpt', '125', 2022, 'fall');
        const courseSection = await course.getSection('d100');

        expect(courseSection).toMatchSnapshot();
    });
    test('for loop over course sections', async () => {
        const course = await wrappers.course('cmpt', '125', 2022, 'fall');

        const courseSections: CourseSection[] = [];
        for await (const courseSection of course) {
            courseSections.push(courseSection);
        }

        expect(courseSections).toMatchSnapshot();
    });
});
