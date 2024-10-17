import { processAllRequests } from '@utils';
import type { CourseOutlinesYear, CourseOutlinesTerm } from '@api-types';
import { Course } from '@api';
import wrappers from '@wrappers';

export default async function departmentCourses(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course[]> {
    const departmentCourseNumbers: string[] =
        await wrappers.departmentCourseNumbers(
            department.toLowerCase(),
            year,
            term.toLowerCase() as CourseOutlinesTerm,
        );

    return await processAllRequests(
        departmentCourseNumbers,
        (departmentCourseNumber) => {
            return wrappers.course(
                department.toLowerCase(),
                departmentCourseNumber.toLowerCase(),
                year,
                term.toLowerCase() as CourseOutlinesTerm,
            );
        },
    );
}
