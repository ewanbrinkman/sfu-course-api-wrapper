import { CourseOutlinesTerm, CourseOutlinesYear } from '@api-types';
import { Department } from '@api';
import wrappers from '@wrappers';
import { NotFoundError } from '@errors';

export default async function department(
    department: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Department> {
    const departments = await wrappers.departments(year, term);

    const foundDepartment = departments.find((dept) => dept.id === department);
    if (foundDepartment === undefined) {
        throw new NotFoundError(department);
    }

    return foundDepartment;
}
