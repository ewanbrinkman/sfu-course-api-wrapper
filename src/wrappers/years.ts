import { requestSFUCourseOutlinesApi } from '@utils';
import { RawYear } from '@api-types';

export default async function years(): Promise<number[]> {
    const response = await requestSFUCourseOutlinesApi();
    const rawYears: RawYear[] = await response.json();

    return rawYears.map((rawYear) => rawYear.value);
}
