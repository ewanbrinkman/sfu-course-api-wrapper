import type {
    RawApiCourseOffering,
    ProcessedApiCourseOffering,
    DegreeLevel,
    DeliveryMethod,
    Enrollment,
    GradingScheme,
    Textbook,
    ProcessedApiCourseOfferingNotes,
} from '@api-types';
import { InstructorRole } from '@api-types';
import { Instructor, SchedulePart } from '@api';

export default class CourseOffering {
    title: string;
    name: string;
    department: string;
    number: string;
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
    instructors: Instructor[];
    deliveryMethod: DeliveryMethod;
    term: string;
    schedule: SchedulePart[];
    type: Enrollment;
    gradingScheme?: GradingScheme[];
    internal: {
        outlinePath: string;
        number: number;
    };
    notes: ProcessedApiCourseOfferingNotes;
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
        const instructors: Instructor[] = rawApiCourseOffering.instructor.map(
            (rawApiInstructor) =>
                Instructor.fromRawApiInstructor(rawApiInstructor),
        );
        const schedule: SchedulePart[] =
            rawApiCourseOffering.courseSchedule.map((rawApiSchedulePart) =>
                SchedulePart.fromRawApiSchedulePart(rawApiSchedulePart),
            );

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

    get primaryInstructors(): Instructor[] {
        return this.instructors.filter(
            (instructor) =>
                instructor.role === InstructorRole.PrimaryInstructor,
        );
    }

    get secondaryInstructors(): Instructor[] {
        return this.instructors.filter(
            (instructor) =>
                instructor.role === InstructorRole.SecondaryInstructor,
        );
    }
}
