export enum DeliveryMethod {
    InPerson = 'In Person',
    DistanceEducation = 'Distance Education',
}

export enum DegreeLevel {
    Undergraduate = 'UGRD',
    Graduate = 'GRAD',
}

export enum Enrollment {
    EnrollmentSection = 'e',
    NonEnrollment = 'n',
}

export enum InstructorRole {
    PrimaryInstructor = 'PI',
    SecondaryInstructor = 'SI',
}

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

export enum Day {
    Monday = 'Mo',
    Tuesday = 'Tu',
    Wednesday = 'We',
    Thursday = 'Th',
    Friday = 'Fr',
    Saturday = 'Sa',
    Sunday = 'Su',
}

export enum Campus {
    Burnaby = 'Burnaby',
    Surrey = 'Surrey',
    Vancouver = 'Vancouver',
}

export enum SectionCode {
    Lecture = 'LEC',
    Tutorial = 'TUT',
    Lab = 'LAB',
    Seminar = 'SEM',
}

export interface RawApiSchedulePart {
    roomNumber: number;
    endDate: string;
    campus: Campus;
    buildingCode: string;
    days: string;
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export interface ProcessedApiSchedulePart {
    roomNumber: number;
    endDate: string;
    campus: Campus;
    buildingCode: string;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export interface GradingScheme {
    description: string;
    weight: number;
}

export interface Textbook {
    details: string;
}

export interface ProcessedApiCourseOffering {
    title: string;
    name: string;
    department: string;
    number: number;
    section: string;
    units: number;
    degreeLevel: DegreeLevel;
    description: string;
    details: string;
    designation: string;
    materials: string;
    prerequisites: string;
    corequisites: string;
    requirements: string;
    educationalGoals: string;
    specialTopic: string;
    instructors: ProcessedApiInstructor[];
    deliveryMethod: DeliveryMethod;
    term: string;
    schedule: ProcessedApiSchedulePart[];
    type: Enrollment;
    gradingScheme?: GradingScheme;
    internal: {
        outlinePath: string;
        number: number;
    };
    notes: {
        general: string;
        grading: string;
        registrar: string;
        requiredReading: string;
        departmentalUndergraduateNotes: string;
        short?: string;
    };
    text: {
        required?: Textbook[];
        recommended?: Textbook[];
    };
}

export interface RawApiCourseOffering {
    info: {
        educationalGoals: string;
        notes: string;
        deliveryMethod: DeliveryMethod;
        description: string;
        section: string;
        units: number;
        title: string;
        type: Enrollment;
        classNumber: number;
        departmentalUgradNotes: string;
        prerequisites: string;
        number: number;
        requiredReadingNotes: string;
        registrarNotes: string;
        shortNote?: string;
        outlinePath: string;
        term: string;
        requirements: string;
        gradingNotes: string;
        corequisites: string;
        dept: string;
        degreeLevel: DegreeLevel;
        specialTopic: string;
        courseDetails: string;
        materials: string;
        name: string;
        designation: string;
    };
    instructor: RawApiInstructor[];
    courseSchedule: RawApiSchedulePart[];
    grades?: GradingScheme;
    requiredText?: Textbook[];
    recommendedText?: Textbook[];
}
