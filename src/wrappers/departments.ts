import { requestSFUCourseOutlinesApi } from '@utils';
import { CourseOutlinesTerm, CourseOutlinesYear } from '@api-types';

type DepartmentValue = {
    text: string;
    value: string;
    name: string;
};

type DepartmentValues = DepartmentValue[];

export default async function departments(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<string[]> {
    const response = await requestSFUCourseOutlinesApi(year, term);
    const rawDepartments: DepartmentValues = await response.json();

    console.log(rawDepartments);

    return rawDepartments.map((rawDepartment) => rawDepartment.name);
}
