import type {
    RawCourseData,
    CourseData,
    CourseSectionSummary,
    RawCourseBaseData,
    CourseOutlinesTerm,
    CourseOutlinesYear,
} from '@api-types';
import { processRawCourseBaseData } from '@utils';

function processRawCourseData(
    rawCourseData: RawCourseData,
    year: CourseOutlinesYear,
    term: CourseOutlinesTerm,
    department: string,
): CourseData {
    const courseSectionSummaries: CourseSectionSummary[] =
        rawCourseData.sections.map((rawCourseSectionSummary) => {
            return {
                sectionName: rawCourseSectionSummary.number,
                section: rawCourseSectionSummary.value,
                status: rawCourseSectionSummary.classStatus,
                type: rawCourseSectionSummary.classType,
                sectionCode: rawCourseSectionSummary.sectionCode,
                associatedCourse: rawCourseSectionSummary.associatedClass,
            };
        });

    const rawCourseBaseData: RawCourseBaseData = rawCourseData;
    const courseBaseData = processRawCourseBaseData(
        rawCourseBaseData,
        year,
        term,
        department,
    );

    const courseData: CourseData = {
        ...courseBaseData,
        recommended: rawCourseData.recommended,
        courseSectionSummaries: courseSectionSummaries,
    };
    return courseData;
}

export default processRawCourseData;
