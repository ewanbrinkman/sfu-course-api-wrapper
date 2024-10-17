import { requestSFUAcademicCalendarApiCourses } from '@utils';
import {
    CourseOutlinesTerm,
    CourseOutlinesYear,
    RawDepartmentData,
} from '@api-types';
import { Department } from '@api';
import { EmptyResponseError } from '@errors';

export default async function departments(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Department[]> {
    const response = await requestSFUAcademicCalendarApiCourses(year, term);
    const rawDepartmentData: RawDepartmentData[] = await response.json();

    if (rawDepartmentData.length === 0) {
        throw new EmptyResponseError(response.url);
    }

    return rawDepartmentData.map((rawDepartmentDataEntry) =>
        Department.fromRawDepartmentData(rawDepartmentDataEntry),
    );
}
