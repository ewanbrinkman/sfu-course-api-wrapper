import type {
    RawApiSection,
    ProcessedApiSection,
    CourseType,
    SectionCode,
} from '@api-types';

export default class Section {
    sectionName: string;
    section: string;
    status: 'a';
    type: CourseType;
    sectionCode: SectionCode;
    associatedCourse: number;

    constructor(sectionData: ProcessedApiSection) {
        Object.assign(this, sectionData);
    }

    static fromRawApiSection(rawApiSection: RawApiSection): Section {
        const processedApiSection: ProcessedApiSection = {
            sectionName: rawApiSection.number,
            section: rawApiSection.value,
            status: rawApiSection.classStatus,
            type: rawApiSection.classType,
            sectionCode: rawApiSection.sectionCode,
            associatedCourse: rawApiSection.associatedClass,
        };

        return new Section(processedApiSection);
    }
}
