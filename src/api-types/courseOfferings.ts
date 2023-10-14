import type {
    DegreeLevel,
    DeliveryMethod,
    Enrollment,
    GradingScheme,
    Textbook,
    RawApiInstructor,
    RawApiSchedulePart,
    ProcessedApiInstructor,
    ProcessedApiSchedulePart,
} from '@api-types';

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
