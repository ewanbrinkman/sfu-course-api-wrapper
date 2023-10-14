import course from '../../src/wrappers/course';
import Course from '../../src/api/Course';

describe('courseOffering', () => {
    test('request cmpt 120 d100 2021 fall', async () => {
        const courseData: Course = await course(
            'cmpt',
            '120',
        );
    });
});
