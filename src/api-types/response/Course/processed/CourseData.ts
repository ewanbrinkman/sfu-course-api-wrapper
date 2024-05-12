import { CourseBaseData } from '@api-types';
import { CourseSectionSummary } from '@api-types';

interface CourseData extends CourseBaseData {
    recommended: string;
    courseSectionSummaries: CourseSectionSummary[];
}

export default CourseData;
