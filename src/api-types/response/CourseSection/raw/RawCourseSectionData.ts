import {
    RawInstructorData,
    GradingScheme,
    Textbook,
    RawScheduleData,
    RawCourseSectionInfo,
} from '@api-types';

interface RawCourseSectionData {
    info: RawCourseSectionInfo;
    instructor: RawInstructorData[];
    courseSchedule: RawScheduleData;
    grades?: GradingScheme[];
    requiredText?: Textbook[];
    recommendedText?: Textbook[];
}

export default RawCourseSectionData;
