import { requestSFUAcademicCalendarApi } from '@utils';

type YearValue = {
    value: number;
};

type YearValues = YearValue[];

export default async function years(
): Promise<number[]> {
    const response = (
        await requestSFUAcademicCalendarApi()
    );
    const rawYears: YearValues = await response.json();

    return rawYears.map(rawYear => rawYear.value);
}
