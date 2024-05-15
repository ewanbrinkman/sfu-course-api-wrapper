import { requestSFUCourseOutlinesApi } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawCourseSectionData,
} from '@api-types';
import { CourseSection } from '@api';

export default async function courseSection(
    department: string,
    number: string,
    section: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<CourseSection> {
    const response = await requestSFUCourseOutlinesApi(
        year,
        term.toLowerCase(),
        department.toLowerCase(),
        number.toLowerCase(),
        section.toLowerCase(),
    );
    const rawCourseSectionData: RawCourseSectionData = await response.json();

    return CourseSection.fromRawCourseSectionData(
        rawCourseSectionData,
        year,
        term,
        department,
    );
}
