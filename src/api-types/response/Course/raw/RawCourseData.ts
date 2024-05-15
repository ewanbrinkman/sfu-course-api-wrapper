import { RawCourseBaseData } from '@api-types';
import { RawCourseSectionSummary } from '@api-types';

interface RawCourseData extends RawCourseBaseData {
    recommended: string;
    sections: RawCourseSectionSummary[];
}

export default RawCourseData;
