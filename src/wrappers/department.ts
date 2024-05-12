import { requestSFUAcademicCalendarApiCourses, limitConcurrency } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawDepartmentCourse,
} from '@api-types';

export default async function department(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<string[]> {
    const rawDepartmentCourses: RawDepartmentCourse[] = (
        await requestSFUAcademicCalendarApiCourses(year, term, department)
    ).data;

    return rawDepartmentCourses.map(rawDepartmentCourse => rawDepartmentCourse.value);
}
