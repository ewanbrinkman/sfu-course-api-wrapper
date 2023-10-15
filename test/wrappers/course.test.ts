import course from '../../src/wrappers/course';
import Course from '../../src/api/Course';
import CourseOffering from '../../src/api/CourseOffering';
import { DegreeLevel, DeliveryMethod, Enrollment } from '../../src/api-types/courseOfferings';

describe('course', () => {
    test('request cmpt 125 fall 2022', async () => {
        const courseData: Course = await course('cmpt', '125', 2022, 'fall');

        jest.spyOn(courseData, 'sections', 'get').mockReturnValue(jest.fn().mockReturnValue({}));

        expect(courseData).toMatchSnapshot();
    });
    test('get course offerings', async () => {
        const courseData: Course = await course('cmpt', '125', 2022, 'fall');
        const courseOfferingData: CourseOffering =
            await courseData.sections['d100'];

        expect(courseOfferingData).toMatchSnapshot();
    });
});
