import type {
    RawInstructorData,
    InstructorData,
    InstructorRole,
} from '@api-types';
import { processRawInstructorData } from '@utils';

export default class Instructor implements InstructorData {
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

    constructor(instructorData: InstructorData) {
        this.profileUrl = instructorData.profileUrl;
        this.commonName = instructorData.commonName;
        this.firstName = instructorData.firstName;
        this.lastName = instructorData.lastName;
        this.phone = instructorData.phone;
        this.role = instructorData.role;
        this.name = instructorData.name;
        this.officeHours = instructorData.officeHours;
        this.office = instructorData.office;
        this.email = instructorData.email;
    }

    static fromRawApiInstructor(
        rawInstructorData: RawInstructorData,
    ): Instructor {
        const instructorData = processRawInstructorData(rawInstructorData);

        return new Instructor(instructorData);
    }
}
