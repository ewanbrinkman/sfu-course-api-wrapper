import courseOffering from '../../src/wrappers/courseOffering';

describe('courseOffering', () => {
    test('request', async () => {
        const courseOutlineData = await courseOffering(
            'cmpt',
            120,
            'd100',
            2021,
            'fall',
        );
    });
});
