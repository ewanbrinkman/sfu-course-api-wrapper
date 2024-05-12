import type {
    RawCourseSectionData,
    DegreeLevel,
    DeliveryMethod,
    Enrollment,
    GradingScheme,
    Textbook,
    CourseSectionData,
    CourseBaseData,
    CourseOutlinesTerm,
    CourseOutlinesYear,
} from '@api-types';
import { InstructorRole, CourseSectionNotes } from '@api-types';
import { Instructor, Schedule } from '@api';
import CourseBase from '@api/CourseBase';
import { processRawCourseSectionData } from '@utils';

export default class CourseSection extends CourseBase implements CourseSectionData {
    name: string;
    departmentName: string;
    section: string;
    degreeLevel: DegreeLevel;
    details: string;
    materials: string;
    requirements: string;
    educationalGoals: string;
    specialTopic: string;
    instructors: Instructor[];
    deliveryMethod: DeliveryMethod;
    termName: string; // The term and the year as one string. Ex: "Fall 2022".
    schedule: Schedule;
    type: Enrollment;
    gradingScheme?: GradingScheme[];
    internal: {
        outlinePath: string;
        number: number;
    };
    notes: CourseSectionNotes;
    text: {
        required?: Textbook[];
        recommended?: Textbook[];
    };

    constructor(courseSectionData: CourseSectionData) {
        const courseBaseData: CourseBaseData = courseSectionData;
        super(courseBaseData);

        this.name = courseSectionData.name;
        this.departmentName = courseSectionData.departmentName;
        this.section = courseSectionData.section;
        this.degreeLevel = courseSectionData.degreeLevel;
        this.details = courseSectionData.details;
        this.materials = courseSectionData.materials;
        this.requirements = courseSectionData.requirements;
        this.educationalGoals = courseSectionData.educationalGoals;
        this.specialTopic = courseSectionData.specialTopic;
        this.instructors = courseSectionData.instructors.map(instructorData => {
            return new Instructor(instructorData);
        });
        this.deliveryMethod = courseSectionData.deliveryMethod;
        this.termName = courseSectionData.termName;
        this.schedule = new Schedule(courseSectionData.schedule);
        this.type = courseSectionData.type;
        this.gradingScheme = courseSectionData.gradingScheme;
        this.internal = courseSectionData.internal;
        this.notes = courseSectionData.notes;
        this.text = courseSectionData.text;
    }

    static fromRawCourseSectionData(
        rawCourseSectionData: RawCourseSectionData,
        year: CourseOutlinesYear,
        term: CourseOutlinesTerm,
        department: string,
    ): CourseSection {
        const courseSectionData = processRawCourseSectionData(rawCourseSectionData, year, term, department);
       
        return new CourseSection(courseSectionData);
    }

    public get primaryInstructors(): Instructor[] {
        return this.instructors.filter(
            (instructor) =>
                instructor.role === InstructorRole.PrimaryInstructor,
        );
    }

    public get secondaryInstructors(): Instructor[] {
        return this.instructors.filter(
            (instructor) =>
                instructor.role === InstructorRole.SecondaryInstructor,
        );
    }
}
