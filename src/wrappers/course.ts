import { requestSFUAcademicCalendarApiCourses } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawApiCourse,
} from '@api-types';
import { Course } from '@api';

export default async function course(
    department: string,
    number: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course> {
    const rawApiCourse: RawApiCourse = (
        await requestSFUAcademicCalendarApiCourses(
            year,
            term,
            department,
            number,
        )
    ).data;

    return Course.fromRawApiCourse(rawApiCourse);
}
