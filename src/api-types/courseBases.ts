export enum SectionCode {
    Lecture = 'LEC',
    Tutorial = 'TUT',
    Lab = 'LAB',
    Seminar = 'SEM',
}

export interface RawApiCourseBase {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string;  // Needs to be a string, since could be "100w".
    notes: string;
    units: number;
    designation: string;
}

export interface ProcessedApiCourseBaseNotes {
    general: string;
};

export interface ProcessedApiCourseBase {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string;  // Needs to be a string, since could be "100w".
    notes: ProcessedApiCourseBaseNotes;
    units: number;
    designation: string;
}
