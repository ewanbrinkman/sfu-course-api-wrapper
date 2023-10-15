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

    private sections: Record<string, CourseOffering | undefined>;

    constructor(
        courseData: ProcessedApiCourse,
        department: string,
        year: CourseOutlinesYear = 'current',
        term: CourseOutlinesTerm = 'current',
    ) {
        Object.assign(this, courseData);

        this.sections = courseData.sections.reduce(
            (courseOfferings, section) => {
                courseOfferings[section.section] = undefined;
                return courseOfferings;
            },
            {} as Record<string, CourseOffering | undefined>,
        );

        this.department = department;
        this.year = year;
        this.term = term;
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

    public hasSection(section: string): boolean {
        return section in this.sections;
    }

    public async getSection(section: string): Promise<CourseOffering> {
        if (this.sections[section] === undefined) {
            const courseOfferingData: CourseOffering =
                await this.getCourseOffering(section);
            this.sections[section] = courseOfferingData;
        }

        return this.sections[section] as CourseOffering;
    }

    private async getCourseOffering(section: string): Promise<CourseOffering> {
        return await wrappers.courseOffering(
            this.department,
            this.number,
            section,
            this.year,
            this.term,
        );
    }

    async *[Symbol.asyncIterator](): AsyncIterableIterator<CourseOffering> {
        const sectionKeys = Object.keys(this.sections);

        for (const sectionKey of sectionKeys) {
            yield await this.getSection(sectionKey);
        }
    }

    public async getSections(): Promise<CourseOffering[]> {
        const sections: CourseOffering[] = [];

        for await (const courseOffering of this) {
            sections.push(courseOffering);
        }

        return sections;
    }
}
