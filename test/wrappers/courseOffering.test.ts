import courseOffering from '../../src/wrappers/courseOffering';
import CourseOffering from '../../src/api/CourseOffering';

describe('courseOffering', () => {
    test('request', async () => {
        const courseOfferingData: CourseOffering = await courseOffering(
            'cmpt',
            120,
            'd100',
            2021,
            'fall',
        );

        console.log(courseOfferingData);
    });
});
