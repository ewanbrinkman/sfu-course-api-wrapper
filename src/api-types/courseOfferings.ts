import type {
    RawApiInstructor,
    RawApiSchedulePart,
    ProcessedApiInstructor,
    ProcessedApiSchedulePart,
    RawApiCourseBase,
    ProcessedApiCourseBase,
    ProcessedApiCourseBaseNotes
} from '@api-types';

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

export interface GradingScheme {
    description: string;
    weight: number;
}

export interface Textbook {
    details: string;
}

export interface ProcessedApiCourseOfferingNotes extends ProcessedApiCourseBaseNotes {
    grading: string;
    registrar: string;
    requiredReading: string;
    departmentalUndergraduateNotes: string;
    short?: string;
};

export interface ProcessedApiCourseOffering extends ProcessedApiCourseBase {
    name: string;
    department: string;
    section: string;
    degreeLevel: DegreeLevel;
    details: string;
    materials: string;
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
    notes: ProcessedApiCourseOfferingNotes;
    text: {
        required?: Textbook[];
        recommended?: Textbook[];
    };
}

interface RawApiCourseOfferingInfo extends RawApiCourseBase {
    educationalGoals: string;
    deliveryMethod: DeliveryMethod;
    section: string;
    type: Enrollment;
    classNumber: number;
    departmentalUgradNotes: string;
    requiredReadingNotes: string;
    registrarNotes: string;
    shortNote?: string;
    outlinePath: string;
    term: string;
    requirements: string;
    gradingNotes: string;
    dept: string;
    degreeLevel: DegreeLevel;
    specialTopic: string;
    courseDetails: string;
    materials: string;
    name: string;
}

export interface RawApiCourseOffering {
    info: RawApiCourseOfferingInfo;
    instructor: RawApiInstructor[];
    courseSchedule: RawApiSchedulePart[];
    grades?: GradingScheme;
    requiredText?: Textbook[];
    recommendedText?: Textbook[];
}
