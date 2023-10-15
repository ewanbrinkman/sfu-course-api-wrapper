import type {
    RawApiCourse,
    ProcessedApiCourse,
    ProcessedApiCourseBaseNotes,
    CourseOutlinesYear,
    CourseOutlinesTerm,
} from '@api-types';
import { CourseOffering, Section } from '@api';
import wrappers from '@wrappers';

export default class Course {
    private courseOfferings: Map<string, CourseOffering | undefined> =
        new Map();

    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string;
    notes: ProcessedApiCourseBaseNotes;
    units: number;
    designation: string;
    recommended: string;

    department: string;
    year: CourseOutlinesYear;
    term: CourseOutlinesTerm;

    sections: Record<string, CourseOffering>;

    constructor(
        courseData: ProcessedApiCourse,
        department: string,
        year: CourseOutlinesYear = 'current',
        term: CourseOutlinesTerm = 'current',
    ) {
        Object.assign(this, courseData);

        this.courseOfferings = courseData.sections.reduce(
            (courseOfferings, section) => {
                courseOfferings.set(section.section, undefined);
                return courseOfferings;
            },
            new Map<string, CourseOffering | undefined>(),
        );

        this.department = department;
        this.year = year;
        this.term = term;

        this.sections = new Proxy(
            {},
            {
                get: async (
                    target: Record<string, CourseOffering>,
                    section: string,
                ) => {
                    // If the course offering section hasn't been loaded yet,
                    // load it (request it from the API).
                    if (this.courseOfferings.get(section) === undefined) {
                        // Request the course offering from the API and save it.
                        const courseOfferingData =
                            await wrappers.courseOffering(
                                this.department,
                                this.number,
                                section,
                                this.year,
                                this.term,
                            );

                        this.courseOfferings.set(
                            section,
                            courseOfferingData,
                        );
                    }

                    return this.courseOfferings.get(section);
                },
            },
        );
    }

    static fromRawApiCourse(
        rawApiCourse: RawApiCourse,
        department: string,
        year: CourseOutlinesYear = 'current',
        term: CourseOutlinesTerm = 'current',
    ): Course {
        const sections: Section[] = rawApiCourse.sections.map((rawApiSection) =>
            Section.fromRawApiSection(rawApiSection),
        );

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
            sections: sections,
        };
        return new Course(processedApiCourse, department, year, term);
    }

    // getSections(): string[] {
    //     return Array.from(this.courseOfferings.keys());
    // }

    hasSection(section: string): boolean {
        return this.courseOfferings.has(section);
    }
}
