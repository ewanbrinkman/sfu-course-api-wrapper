import { convertStringDaysToEnumDays } from '../../src/utils/conversions';
import { Day } from '../../src/api-types/courseOfferingInfo';

describe('conversions', () => {
    describe('convertStringDaysToEnumDays', () => {
        test('Monday, Wednesday, Friday', async () => {
            const stringDays: string = 'Mo, We, Fr';
            const result: Day[] = convertStringDaysToEnumDays(stringDays);
            const expected: Day[] = [Day.Monday, Day.Wednesday, Day.Friday];

            expect(result).toEqual(expected);
        });
    });
});
