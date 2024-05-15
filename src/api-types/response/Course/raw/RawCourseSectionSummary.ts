import { CourseType, SectionCode } from '@api-types';

interface RawCourseSectionSummary {
    number: string; // Number here is actually section (ex. "D100").
    value: string; // If number is "D100", then value is "d100".
    classStatus: 'a'; // Don't know what the possible values of this is.
    classType: CourseType; // Ex. "lecture".
    sectionCode: SectionCode; // Ex. "LEC".
    associatedClass: number;
}

export default RawCourseSectionSummary;
