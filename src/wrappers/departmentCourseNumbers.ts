import { requestSFUAcademicCalendarApiCourses } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawDepartmentCourse,
} from '@api-types';
import { EmptyResponseError } from '@errors';

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

    if (rawDepartmentCourses.length === 0) {
        throw new EmptyResponseError(response.url);
    }

    return rawDepartmentCourses.map((rawDepartmentCourse) =>
        rawDepartmentCourse.value.toUpperCase(),
    );
}
