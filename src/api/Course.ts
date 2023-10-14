import type {
    RawApiCourse,
    ProcessedApiCourse,
    CourseSection,
    ProcessedApiCourseBaseNotes
} from '@api-types';

export default class Course implements ProcessedApiCourse {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string;
    notes: ProcessedApiCourseBaseNotes;
    units: number;
    designation: string;
    recommended: string;
    sections: CourseSection[];

    constructor(courseData: ProcessedApiCourse) {
        Object.assign(this, courseData);
    }

    static fromRawApiCourse(rawApiCourse: RawApiCourse): Course {
        const processedApiCourse: ProcessedApiCourse = {
            title: rawApiCourse.title,
            description: rawApiCourse.description,
            corequisites: rawApiCourse.corequisites,
            prerequisites: rawApiCourse.prerequisites,
            number: rawApiCourse.number,
            notes: {
                general: rawApiCourse.notes,
            },
            units: rawApiCourse.units,
            designation: rawApiCourse.designation,
            recommended: rawApiCourse.recommended,
            sections: rawApiCourse.sections,
        };
        return new Course(processedApiCourse);
    }
}
