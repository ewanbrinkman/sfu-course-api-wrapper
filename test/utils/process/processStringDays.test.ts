import convertStringDaysToEnumDays from '../../../src/utils/process/processStringDays';
import Day from '../../../src/api-types/response/SchedulePart/common/Day';

describe('process', () => {
    describe('processStringDays', () => {
        test('Monday, Wednesday, Friday', async () => {
            const stringDays: string = 'Mo, We, Fr';
            const result: Day[] = convertStringDaysToEnumDays(stringDays);
            const expected: Day[] = [Day.Monday, Day.Wednesday, Day.Friday];

            expect(result).toEqual(expected);
        });
    });
});
