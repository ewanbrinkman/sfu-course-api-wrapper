import type { DepartmentData, RawDepartmentData } from '@api-types';

function processRawDepartmentData(
    rawDepartmentData: RawDepartmentData,
): DepartmentData {
    return {
        name: rawDepartmentData.title,
        id: rawDepartmentData.value,
    };
}

export default processRawDepartmentData;
