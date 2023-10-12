import { requestSFUCourseOutlinesApi } from '@utils';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
    RawApiCourseOffering,
} from '@api-types';
import { CourseOffering } from '@api';

export default async function courseOutline(
    department: string,
    number: number,
    section: string,
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
): Promise<CourseOffering> {
    const rawApiCourseOffering: RawApiCourseOffering = (
        await requestSFUCourseOutlinesApi(
            year,
            term,
            department,
            number,
            section,
        )
    ).data;

    return CourseOffering.fromRawApiCourseOffering(rawApiCourseOffering);
}
