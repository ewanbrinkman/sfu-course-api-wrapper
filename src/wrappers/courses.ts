import { requestSFUAcademicCalendarApiCourses, limitConcurrency } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawDepartmentCourse,
} from '@api-types';
import { Course } from '@api';
import wrappers from '@wrappers';

export default async function courses(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course[]> {
    const response = (
        await requestSFUAcademicCalendarApiCourses(year, term, department)
    );
    const rawDepartmentCourses: RawDepartmentCourse[] = await response.json();

    // Can't request all of them at once, since that spams the API and the API
    // has problems with that.
    return await limitConcurrency(
        rawDepartmentCourses,
        async (rawDepartmentCourse) => {
            return wrappers.course(department, rawDepartmentCourse.value, year, term);
        }
    );
}
