import courseOffering from '../../src/wrappers/courseOffering';
import { CourseOffering } from '../../src/api';

describe('courseOffering', () => {
    test('request', async () => {
        const courseOfferingData: CourseOffering = await courseOffering(
            'cmpt',
            120,
            'd100',
            2021,
            'fall',
        );
    });
});
