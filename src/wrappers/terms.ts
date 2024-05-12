import { requestSFUAcademicCalendarApi } from '@utils';
import { CourseOutlinesYear, Term } from '@api-types';

type TermValue = {
    value: Term;
};

type TermValues = TermValue[];

export default async function terms(
    year: CourseOutlinesYear = 'current'
): Promise<Term[]> {
    const rawTerms: TermValues = (
        await requestSFUAcademicCalendarApi(year)
    ).data;

    return rawTerms.map(rawTerm => rawTerm.value);
}
