import type { RawDepartmentData, DepartmentData } from '@api-types';
import { processRawDepartmentData } from '@utils';

export default class Department implements DepartmentData {
    name: string;
    id: string;

    constructor(departmentData: DepartmentData) {
        this.name = departmentData.name;
        this.id = departmentData.id;
    }

    static fromRawDepartmentData(
        rawDepartmentData: RawDepartmentData,
    ): Department {
        const departmentData = processRawDepartmentData(rawDepartmentData);

        return new Department(departmentData);
    }
}
