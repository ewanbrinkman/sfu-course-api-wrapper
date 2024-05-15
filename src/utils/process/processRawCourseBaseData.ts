import type {
    CourseBaseNotes,
    CourseOutlinesTerm,
    CourseBaseData,
    RawCourseBaseData,
    CourseOutlinesYear,
} from '@api-types';

function processRawCourseBaseData(
    rawCourseBaseData: RawCourseBaseData,
    year: CourseOutlinesYear,
    term: CourseOutlinesTerm,
    department: string,
): CourseBaseData {
    const courseBaseNotes: CourseBaseNotes = {
        general: rawCourseBaseData.notes,
    };

    const courseBaseData: CourseBaseData = {
        title: rawCourseBaseData.title,
        description: rawCourseBaseData.description,
        corequisites: rawCourseBaseData.corequisites,
        prerequisites: rawCourseBaseData.prerequisites,
        number: rawCourseBaseData.number,
        notes: courseBaseNotes,
        units: rawCourseBaseData.units,
        designation: rawCourseBaseData.designation,

        year: year,
        term: term,
        department: department,
    };

    return courseBaseData;
}

export default processRawCourseBaseData;
