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
    const response = (
        await requestSFUAcademicCalendarApiCourses(year, term, department)
    );
    const rawDepartmentCourses: RawDepartmentCourse[] = await response.json();

    return rawDepartmentCourses.map(rawDepartmentCourse => rawDepartmentCourse.value);
}
