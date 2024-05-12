import { CourseBaseNotes } from '@api-types';

export default interface CourseSectionNotes extends CourseBaseNotes {
    grading: string;
    registrar: string;
    requiredReading: string;
    departmentalUndergraduateNotes: string;
    short?: string;
}
