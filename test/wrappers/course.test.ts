import course from '../../src/wrappers/course';
import Course from '../../src/api/Course';

describe('course', () => {
    test('request cmpt 125 fall 2022', async () => {
        const courseData: Course = await course(
            'cmpt',
            '125',
            2022,
            'fall',
        );
    });
});
