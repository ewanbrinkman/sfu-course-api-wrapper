import course from '../../src/wrappers/course';

describe('course', () => {
    test('request cmpt 125 fall 2022', async () => {
        const courseData = await course('cmpt', '125', 2022, 'fall');

        expect(courseData).toMatchSnapshot();
    });
    test('get course offerings', async () => {
        const courseData = await course('cmpt', '125', 2022, 'fall');
        const courseOfferingData =
            await courseData.getSection('d100');

        expect(courseOfferingData).toMatchSnapshot();
    });
});
