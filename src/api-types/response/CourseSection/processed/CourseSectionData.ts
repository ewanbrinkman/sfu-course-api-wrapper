import {
    DegreeLevel,
    CourseBaseData,
    CourseSectionNotes,
    DeliveryMethod,
    Enrollment,
    GradingScheme,
    Textbook,
    InstructorData,
    ScheduleData,
} from '@api-types';

export default interface CourseSectionData extends CourseBaseData {
    name: string;
    departmentName: string;
    section: string;
    degreeLevel: DegreeLevel;
    details: string;
    materials: string;
    requirements: string;
    educationalGoals: string;
    specialTopic: string;
    instructors: InstructorData[];
    deliveryMethod: DeliveryMethod;
    termName: string; // The term and the year as one string. Ex: "Fall 2022".
    schedule: ScheduleData;
    type: Enrollment;
    gradingScheme?: GradingScheme[];
    internal: {
        outlinePath: string;
        number: number;
    };
    notes: CourseSectionNotes;
    text: {
        required?: Textbook[];
        recommended?: Textbook[];
    };
}
