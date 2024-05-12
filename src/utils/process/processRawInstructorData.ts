import type {
    InstructorData,
    RawInstructorData,
} from '@api-types';

function processRawInstructorData(
    rawInstructorData: RawInstructorData,
): InstructorData {
    return {
        profileUrl: rawInstructorData.profileUrl,
        commonName: rawInstructorData.commonName,
        firstName: rawInstructorData.firstName,
        lastName: rawInstructorData.lastName,
        phone: rawInstructorData.phone,
        role: rawInstructorData.roleCode,
        name: rawInstructorData.name,
        officeHours: rawInstructorData.officeHours,
        office: rawInstructorData.office,
        email: rawInstructorData.email,
    };
}

export default processRawInstructorData;
