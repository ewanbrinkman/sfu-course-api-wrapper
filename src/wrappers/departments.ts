import { requestSFUAcademicCalendarApiCourses } from '@utils';
import { CourseOutlinesTerm, CourseOutlinesYear } from '@api-types';

type DepartmentValue = {
    title: string;
    value: string;
};

type DepartmentValues = DepartmentValue[];

export default async function departments(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<string[]> {
    const rawDepartments: DepartmentValues = (
        await requestSFUAcademicCalendarApiCourses(year, term)
    ).data;

    return rawDepartments.map(rawDepartment => rawDepartment.value);
}
