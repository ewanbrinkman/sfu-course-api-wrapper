import type {
    RawApiInstructor,
    ProcessedApiInstructor,
    InstructorRole,
} from '@api-types';

export default class Instructor implements ProcessedApiInstructor {
    profileUrl: string;
    commonName?: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: InstructorRole;
    name: string;
    officeHours: string;
    office: string;
    email: string;

    constructor(instructorData: ProcessedApiInstructor) {
        Object.assign(this, instructorData);
    }

    static fromRawApiInstructor(
        rawApiInstructor: RawApiInstructor,
    ): Instructor {
        const processedApiInstructor: ProcessedApiInstructor = {
            profileUrl: rawApiInstructor.profileUrl,
            commonName: rawApiInstructor.commonName,
            firstName: rawApiInstructor.firstName,
            lastName: rawApiInstructor.lastName,
            phone: rawApiInstructor.phone,
            role: rawApiInstructor.roleCode,
            name: rawApiInstructor.name,
            officeHours: rawApiInstructor.officeHours,
            office: rawApiInstructor.office,
            email: rawApiInstructor.email,
        };

        return new Instructor(processedApiInstructor);
    }
}
