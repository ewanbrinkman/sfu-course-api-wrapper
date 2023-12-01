import { requestSFUCourseOutlinesApi, limitConcurrency } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawApiDepartmentCourse,
} from '@api-types';
import { Course } from '@api';
import wrappers from '@wrappers';
import apiConfig from '@config/api.json';

export default async function courses(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course[]> {
    const rawApiDepartmentCourses: RawApiDepartmentCourse[] = (
        await requestSFUCourseOutlinesApi(year, term, department)
    ).data;

    // Can't request all of them at once, since that spams the API and the API
    // has problems with that.
    return await limitConcurrency(
        rawApiDepartmentCourses,
        async (rawApiDepartmentCourse) => {
            return wrappers.course(department, rawApiDepartmentCourse.value, year, term);
        },
        apiConfig.concurrencyLimit,
    );
}
