import type {
    ProcessedApiCourseOffering,
    RawApiCourseOffering,
    ProcessedApiInstructor,
    ProcessedApiSchedule,
    DegreeLevel,
    DeliveryMethod,
    Enrollment,
    GradingScheme,
    Textbook,
} from '@api-types';
import { convertStringDaysToEnumDays } from '@utils';

export class CourseOffering implements ProcessedApiCourseOffering {
    title: string;
    name: string;
    department: string;
    number: number;
    section: string;
    units: number;
    degreeLevel: DegreeLevel;
    description: string;
    details: string;
    designation: string;
    materials: string;
    prerequisites: string;
    corequisites: string;
    requirements: string;
    educationalGoals: string;
    specialTopic: string;
    instructors: ProcessedApiInstructor[];
    deliveryMethod: DeliveryMethod;
    term: string;
    schedule: ProcessedApiSchedule;
    type: Enrollment;
    gradingScheme?: GradingScheme;
    internal: {
        outlinePath: string;
        number: number;
    };
    notes: {
        general: string;
        grading: string;
        registrar: string;
        requiredReading: string;
        departmentalUndergraduateNotes: string;
        short?: string;
    };
    text: {
        required?: Textbook[];
        recommended?: Textbook[];
    };

    constructor(courseOfferingData: ProcessedApiCourseOffering) {
        Object.assign(this, courseOfferingData);
    }

    static fromRawApiCourseOffering(
        rawApiCourseOffering: RawApiCourseOffering,
    ): CourseOffering {
        const instructors: ProcessedApiInstructor[] =
            rawApiCourseOffering.instructor.map((instructor) => ({
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
            }));
        const schedule: ProcessedApiSchedule =
            rawApiCourseOffering.courseSchedule.map((schedulePart) => ({
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

        const processedApiCourseOffering: ProcessedApiCourseOffering = {
            title: rawApiCourseOffering.info.title,
            name: rawApiCourseOffering.info.name,
            department: rawApiCourseOffering.info.dept,
            number: rawApiCourseOffering.info.number,
            section: rawApiCourseOffering.info.section,
            units: rawApiCourseOffering.info.units,
            degreeLevel: rawApiCourseOffering.info.degreeLevel,
            description: rawApiCourseOffering.info.description,
            details: rawApiCourseOffering.info.courseDetails,
            designation: rawApiCourseOffering.info.designation,
            materials: rawApiCourseOffering.info.materials,
            prerequisites: rawApiCourseOffering.info.prerequisites,
            corequisites: rawApiCourseOffering.info.corequisites,
            requirements: rawApiCourseOffering.info.requirements,
            educationalGoals: rawApiCourseOffering.info.educationalGoals,
            specialTopic: rawApiCourseOffering.info.specialTopic,
            instructors: instructors,
            deliveryMethod: rawApiCourseOffering.info.deliveryMethod,
            term: rawApiCourseOffering.info.term,
            schedule: schedule,
            type: rawApiCourseOffering.info.type,
            gradingScheme: rawApiCourseOffering.grades,
            internal: {
                outlinePath: rawApiCourseOffering.info.outlinePath,
                number: rawApiCourseOffering.info.classNumber,
            },
            notes: {
                general: rawApiCourseOffering.info.notes,
                grading: rawApiCourseOffering.info.gradingNotes,
                registrar: rawApiCourseOffering.info.registrarNotes,
                requiredReading: rawApiCourseOffering.info.requiredReadingNotes,
                departmentalUndergraduateNotes:
                    rawApiCourseOffering.info.departmentalUgradNotes,
                short: rawApiCourseOffering.info.shortNote,
            },
            text: {
                required: rawApiCourseOffering.requiredText,
                recommended: rawApiCourseOffering.recommendedText,
            },
        };
        return new CourseOffering(processedApiCourseOffering);
    }
}
