import { requestSFUCourseOutlinesApi } from '@utils';
import { CourseOutlinesYear, RawTerm, Term } from '@api-types';

export default async function terms(
    year: CourseOutlinesYear = 'current',
): Promise<Term[]> {
    const response = await requestSFUCourseOutlinesApi(year);
    const rawTerms: RawTerm[] = await response.json();

    return rawTerms.map((rawTerm) => rawTerm.value);
}
