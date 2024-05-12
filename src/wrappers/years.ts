import { requestSFUAcademicCalendarApi } from '@utils';

type YearValue = {
    value: number;
};

type YearValues = YearValue[];

export default async function years(
): Promise<number[]> {
    const rawYears: YearValues = (
        await requestSFUAcademicCalendarApi()
    ).data;

    return rawYears.map(rawYear => rawYear.value);
}
