import type {
    CourseSectionData,
    RawCourseSectionData,
    CourseOutlinesTerm,
    InstructorData,
    SchedulePartData,
    RawCourseBaseData,
    CourseSectionNotes,
    CourseOutlinesYear,
} from '@api-types';
import {
    processRawInstructorData,
    processRawSchedulePartData,
    processRawCourseBaseData,
} from '@utils';

function processRawCourseSectionData(
    rawCourseSectionData: RawCourseSectionData,
    year: CourseOutlinesYear,
    term: CourseOutlinesTerm,
    department: string,
): CourseSectionData {
    // It is possible for there to be no "instructor" field.
    const instructors: InstructorData[] = rawCourseSectionData.instructor
        ? rawCourseSectionData.instructor.map((rawInstructorData) =>
              processRawInstructorData(rawInstructorData),
          )
        : [];
    const schedule: SchedulePartData[] =
        rawCourseSectionData.courseSchedule.map((rawSchedulePartData) =>
            processRawSchedulePartData(rawSchedulePartData),
        );

    const rawCourseBaseData: RawCourseBaseData = rawCourseSectionData.info;
    const courseBaseData = processRawCourseBaseData(
        rawCourseBaseData,
        year,
        term,
        department,
    );

    const courseSectionNotes: CourseSectionNotes = {
        ...courseBaseData.notes,
        grading: rawCourseSectionData.info.gradingNotes,
        registrar: rawCourseSectionData.info.registrarNotes,
        requiredReading: rawCourseSectionData.info.requiredReadingNotes,
        departmentalUndergraduateNotes:
            rawCourseSectionData.info.departmentalUgradNotes,
        short: rawCourseSectionData.info.shortNote,
    };

    const courseSectionData: CourseSectionData = {
        ...courseBaseData,
        name: rawCourseSectionData.info.name,
        departmentName: rawCourseSectionData.info.dept,
        section: rawCourseSectionData.info.section,
        degreeLevel: rawCourseSectionData.info.degreeLevel,
        details: rawCourseSectionData.info.courseDetails,
        materials: rawCourseSectionData.info.materials,
        requirements: rawCourseSectionData.info.requirements,
        educationalGoals: rawCourseSectionData.info.educationalGoals,
        specialTopic: rawCourseSectionData.info.specialTopic,
        instructors: instructors,
        deliveryMethod: rawCourseSectionData.info.deliveryMethod,
        termName: rawCourseSectionData.info.term,
        schedule: schedule,
        type: rawCourseSectionData.info.type,
        gradingScheme: rawCourseSectionData.grades,
        internal: {
            outlinePath: rawCourseSectionData.info.outlinePath,
            number: rawCourseSectionData.info.classNumber,
        },
        notes: courseSectionNotes,
        text: {
            required: rawCourseSectionData.requiredText,
            recommended: rawCourseSectionData.recommendedText,
        },
    };

    return courseSectionData;
}

export default processRawCourseSectionData;
