import { InstructorRole } from '@api-types';

interface InstructorData {
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
}

export default InstructorData;
