import { InstructorRole } from '@api-types';

interface RawInstructorData {
    profileUrl: string;
    commonName?: string;
    firstName: string;
    lastName: string;
    phone: string;
    roleCode: InstructorRole;
    name: string;
    officeHours: string;
    office: string;
    email: string;
}

export default RawInstructorData;
