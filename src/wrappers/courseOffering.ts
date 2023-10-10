import { requestSFUCourseOutlinesAPI } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    Course,
    Instructor,
    Schedule,
    RawAPIResponseCourse,
} from '@api-types';
import { Day } from '@api-types';

function convertStringDaysToEnumDays(inputDays: string): Day[] {
    // Days are separated by ', '.
    const splitDays = inputDays.split(', ');
    return splitDays.map((splitDay) => {
        switch (splitDay) {
            case Day.Monday:
                return Day.Monday;
            case Day.Tuesday:
                return Day.Tuesday;
            case Day.Wednesday:
                return Day.Wednesday;
            case Day.Thursday:
                return Day.Thursday;
            case Day.Friday:
                return Day.Friday;
            case Day.Saturday:
                return Day.Saturday;
            case Day.Sunday:
                return Day.Sunday;
            default:
                throw new Error(`Invalid day: ${splitDay}`);
        }
    });
}

function purifyRawCourse(rawCourse: RawAPIResponseCourse): Course {
    const instructors: Instructor[] = rawCourse.instructor.map(
        (instructor) => ({
            profileUrl: instructor.profileUrl,
            commonName: instructor.commonName,
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            phone: instructor.phone,
            role: instructor.roleCode,
            name: instructor.name,
            officeHours: instructor.officeHours,
            office: instructor.office,
            email: instructor.email,
        }),
    );
    const schedule: Schedule = rawCourse.courseSchedule.map((schedulePart) => ({
        roomNumber: schedulePart.roomNumber,
        endDate: schedulePart.endDate,
        campus: schedulePart.campus,
        buildingCode: schedulePart.buildingCode,
        days: convertStringDaysToEnumDays(schedulePart.days),
        sectionCode: schedulePart.sectionCode,
        startTime: schedulePart.startTime,
        isExam: schedulePart.isExam,
        endTime: schedulePart.endDate,
        startDate: schedulePart.startTime,
    }));

    return {
        title: rawCourse.info.title,
        name: rawCourse.info.name,
        department: rawCourse.info.dept,
        number: rawCourse.info.number,
        section: rawCourse.info.section,
        units: rawCourse.info.units,
        degreeLevel: rawCourse.info.degreeLevel,
        description: rawCourse.info.description,
        details: rawCourse.info.courseDetails,
        designation: rawCourse.info.designation,
        materials: rawCourse.info.materials,
        prerequisites: rawCourse.info.prerequisites,
        corequisites: rawCourse.info.corequisites,
        requirements: rawCourse.info.requirements,
        educationalGoals: rawCourse.info.educationalGoals,
        specialTopic: rawCourse.info.specialTopic,
        instructors: instructors,
        deliveryMethod: rawCourse.info.deliveryMethod,
        term: rawCourse.info.term,
        schedule: schedule,
        type: rawCourse.info.type,
        gradingScheme: rawCourse.grades,
        internal: {
            outlinePath: rawCourse.info.outlinePath,
            number: rawCourse.info.classNumber,
        },
        notes: {
            general: rawCourse.info.notes,
            grading: rawCourse.info.gradingNotes,
            registrar: rawCourse.info.registrarNotes,
            requiredReading: rawCourse.info.requiredReadingNotes,
            departmentalUndergraduateNotes:
                rawCourse.info.departmentalUgradNotes,
            short: rawCourse.info.shortNote,
        },
        text: {
            required: rawCourse.requiredText,
            recommended: rawCourse.recommendedText,
        },
    };
}

export default async function courseOutline(
    department: string,
    number: number,
    section: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<Course> {
    const rawCourse: RawAPIResponseCourse = (
        await requestSFUCourseOutlinesAPI(
            year,
            term,
            department,
            number,
            section,
        )
    ).data;

    return purifyRawCourse(rawCourse);
}
