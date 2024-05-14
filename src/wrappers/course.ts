import { requestSFUAcademicCalendarApiCourses } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawCourseData,
} from '@api-types';
import { Course } from '@api';

export default async function course(
    department: string,
    number: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course> {
    const response = await requestSFUAcademicCalendarApiCourses(
            year,
            term,
            department,
            number,
        );
    const rawCourseData: RawCourseData = await response.json();

    return Course.fromRawCourseData(rawCourseData, year, term, department);
}
