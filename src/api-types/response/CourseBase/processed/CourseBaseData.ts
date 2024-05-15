import type {
    CourseBaseNotes,
    CourseOutlinesTerm,
    CourseOutlinesYear,
} from '@api-types';

export default interface CourseBaseData {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string; // Needs to be a string, since could be "100w".
    notes: CourseBaseNotes;
    units: number;
    designation: string;

    year: CourseOutlinesYear;
    term: CourseOutlinesTerm;
    department: string;
}
