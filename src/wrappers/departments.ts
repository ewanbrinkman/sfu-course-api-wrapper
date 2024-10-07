import { requestSFUAcademicCalendarApiCourses } from '@utils';
import {
    CourseOutlinesTerm,
    CourseOutlinesYear,
    RawDepartmentData,
} from '@api-types';
import { Department } from '@api';

export default async function departments(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Department[]> {
    const response = await requestSFUAcademicCalendarApiCourses(year, term);
    const rawDepartmentData: RawDepartmentData[] = await response.json();

    return rawDepartmentData.map((rawDepartmentDataEntry) =>
        Department.fromRawDepartmentData(rawDepartmentDataEntry),
    );
}
