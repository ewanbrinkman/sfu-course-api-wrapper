import { CourseType, SectionCode } from '@api-types';

interface CourseSectionSummary {
    sectionName: string; // number here is actually section (ex. "D100").
    section: string; // If `sectionName` is "D100", then `section` is "d100".
    status: 'a'; // Don't know what the possible values of this is.
    type: CourseType; // Ex. "lecture".
    sectionCode: SectionCode; // Ex. "LEC".
    associatedCourse: number;
}

export default CourseSectionSummary;
