import wrappers from '../../src/wrappers';

describe('course', () => {
    test('request cmpt 125 fall 2022', async () => {
        const course = await wrappers.course('cmpt', '125', 2022, 'fall');

        expect(course).toMatchSnapshot();
    });
    test('get course section', async () => {
        const course = await wrappers.course('cmpt', '125', 2022, 'fall');
        const courseSection =
            await course.getSection('d100');

        expect(courseSection).toMatchSnapshot();
    });
});
