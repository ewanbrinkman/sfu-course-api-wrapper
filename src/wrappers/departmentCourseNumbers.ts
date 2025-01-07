import { requestSFUAcademicCalendarApiCourses } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawDepartmentCourse,
} from '@api-types';

export default async function departmentCourseNumbers(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<string[]> {
    const response = await requestSFUAcademicCalendarApiCourses(
        year,
        term.toLowerCase() as CourseOutlinesTerm,
        department.toLowerCase(),
    );
    const rawDepartmentCourses: RawDepartmentCourse[] = await response.json();

    return rawDepartmentCourses.map((rawDepartmentCourse) =>
        rawDepartmentCourse.value.toUpperCase(),
    );
}
