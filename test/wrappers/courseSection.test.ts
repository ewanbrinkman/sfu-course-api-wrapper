import wrappers from '../../src/wrappers';

describe('courseSection', () => {
    test('request cmpt 120 d100 2021 fall', async () => {
        const courseSection = await wrappers.courseSection(
            'cmpt',
            '120',
            'd100',
            2021,
            'fall',
        );

        expect(courseSection).toMatchSnapshot();
    });
});
