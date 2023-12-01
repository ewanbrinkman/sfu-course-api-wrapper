import courseOffering from '../../src/wrappers/courseOffering';

describe('courseOffering', () => {
    test('request cmpt 120 d100 2021 fall', async () => {
        const courseOfferingData = await courseOffering(
            'cmpt',
            '120',
            'd100',
            2021,
            'fall',
        );

        expect(courseOfferingData).toMatchSnapshot();
    });
});
