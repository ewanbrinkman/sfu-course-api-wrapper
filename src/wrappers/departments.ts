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
    const response = (
        await requestSFUAcademicCalendarApiCourses(year, term)
    );
    const rawDepartments: DepartmentValues = await response.json();

    return rawDepartments.map(rawDepartment => rawDepartment.value);
}
