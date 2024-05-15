import type {
    RawCourseData,
    CourseData,
    CourseOutlinesTerm,
    CourseSectionSummary,
    CourseBaseData,
    CourseOutlinesYear,
} from '@api-types';
import { processRawCourseData } from '@utils';
import { CourseSection } from '@api';
import CourseBase from '@api/CourseBase';
import wrappers from '@wrappers';

export default class Course extends CourseBase implements CourseData {
    recommended: string;
    courseSectionSummaries: CourseSectionSummary[];

    private courseSections: Record<string, CourseSection | undefined>;

    constructor(courseData: CourseData) {
        const courseBaseData: CourseBaseData = courseData;
        super(courseBaseData);

        this.recommended = courseData.recommended;
        this.courseSectionSummaries = courseData.courseSectionSummaries;

        this.courseSections = courseData.courseSectionSummaries.reduce(
            (courseSections, courseSectionSummary) => {
                courseSections[courseSectionSummary.section] = undefined;
                return courseSections;
            },
            {} as Record<string, CourseSection | undefined>,
        );
    }

    static fromRawCourseData(
        rawCourseData: RawCourseData,
        year: CourseOutlinesYear,
        term: CourseOutlinesTerm,
        department: string,
    ): Course {
        const courseData = processRawCourseData(
            rawCourseData,
            year,
            term,
            department,
        );

        return new Course(courseData);
    }

    public hasSection(courseSection: string): boolean {
        return courseSection in this.courseSections;
    }

    public get hasSections(): boolean {
        return Object.keys(this.courseSections).length >= 1;
    }

    public get sectionNumbers(): string[] {
        return Object.keys(this.courseSections);
    }

    public async getSection(section: string): Promise<CourseSection> {
        if (this.courseSections[section] === undefined) {
            const courseSectionData: CourseSection =
                await this.getCourseSection(section);
            this.courseSections[section] = courseSectionData;
        }

        return this.courseSections[section] as CourseSection;
    }

    private async getCourseSection(section: string): Promise<CourseSection> {
        return await wrappers.courseSection(
            this.department,
            this.number,
            section,
            this.year,
            this.term,
        );
    }

    async *[Symbol.asyncIterator](): AsyncIterableIterator<CourseSection> {
        const sectionKeys = Object.keys(this.courseSections);

        for (const sectionKey of sectionKeys) {
            yield await this.getSection(sectionKey);
        }
    }

    public async getSections(): Promise<CourseSection[]> {
        const sections: CourseSection[] = [];

        for await (const courseSection of this) {
            sections.push(courseSection);
        }

        return sections;
    }
}
