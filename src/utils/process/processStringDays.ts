import { Day } from '@api-types';

function processStringDays(inputDays: string): Day[] {
    // Days are separated by ', '.
    const splitDays = inputDays.split(', ');
    return splitDays.map((splitDay) => {
        switch (splitDay) {
            case Day.Monday:
                return Day.Monday;
            case Day.Tuesday:
                return Day.Tuesday;
            case Day.Wednesday:
                return Day.Wednesday;
            case Day.Thursday:
                return Day.Thursday;
            case Day.Friday:
                return Day.Friday;
            case Day.Saturday:
                return Day.Saturday;
            case Day.Sunday:
                return Day.Sunday;
            default:
                throw new Error(`Invalid day: ${splitDay}`);
        }
    });
}

export default processStringDays;
