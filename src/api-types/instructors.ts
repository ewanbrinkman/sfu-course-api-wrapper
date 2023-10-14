import type { InstructorRole } from '@api-types';

export interface RawApiInstructor {
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

export interface ProcessedApiInstructor {
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
