import type {
    CourseBaseNotes,
    CourseBaseData,
    RawCourseBaseData,
    CourseOutlinesYear,
    CourseOutlinesTerm,
} from '@api-types';
import { processRawCourseBaseData } from '@utils';

export default class CourseBase implements CourseBaseData {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string;
    notes: CourseBaseNotes;
    units: number;
    designation: string;

    year: CourseOutlinesYear;
    term: CourseOutlinesTerm;
    department: string;

    constructor(
        courseBaseData: CourseBaseData,
    ) {
        this.title = courseBaseData.title;
        this.description = courseBaseData.description;
        this.corequisites = courseBaseData.corequisites;
        this.prerequisites = courseBaseData.prerequisites;
        this.number = courseBaseData.number;
        this.notes = courseBaseData.notes;
        this.units = courseBaseData.units;
        this.designation = courseBaseData.designation;

        this.year = courseBaseData.year;
        this.term = courseBaseData.term;
        this.department = courseBaseData.department;
    }

    static fromRawCourseBaseData(
        rawCourseBaseData: RawCourseBaseData,
        year: CourseOutlinesYear,
        term: CourseOutlinesTerm,
        department: string,
    ): CourseBase {
        const courseBaseData = processRawCourseBaseData(rawCourseBaseData, year, term, department);

        return new CourseBase(courseBaseData);
    }
}
