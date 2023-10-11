import urls from '@utils/urls.json';
import type { CourseOutlinesYear, CourseOutlinesTerm } from '@api-types';
import axios, { AxiosResponse } from 'axios';

function generateURLForSFUApi(
    baseUrl: string,
    ...parameters: (number | string)[]
) {
    return `${baseUrl}?${parameters.join('/')}`;
}

type requestSFUApiFunction = (
    ...parameters: (number | string)[]
) => Promise<AxiosResponse>;

function generateRequestSFUApiFunction(baseUrl: string): requestSFUApiFunction {
    return async (
        ...parameters: (number | string)[]
    ): Promise<AxiosResponse> => {
        try {
            return await axios.get(
                generateURLForSFUApi(baseUrl, ...parameters),
            );
        } catch (error) {
            throw error;
        }
    };
}

export const requestSFUCourseOutlinesApi = generateRequestSFUApiFunction(
    urls.courseOutlines.baseUrl,
);
export const requestSFUAcademicCalendarApi = generateRequestSFUApiFunction(
    urls.academicCalendar.baseUrl,
);

type requestSFUAcademicCalendarApiSectionFunction = (
    year: CourseOutlinesYear,
    term: CourseOutlinesTerm,
    ...parameters: (number | string)[]
) => Promise<AxiosResponse>;

function generateRequestSFUAcademicCalendarApiSectionFunction(
    section: string,
): requestSFUAcademicCalendarApiSectionFunction {
    return async (
        year: CourseOutlinesYear = 'current',
        term: CourseOutlinesTerm = 'current',
        ...parameters: (number | string)[]
    ): Promise<AxiosResponse> => {
        return await requestSFUAcademicCalendarApi(
            year,
            term,
            section,
            ...parameters,
        );
    };
}

export const requestSFUAcademicCalendarAPIAreasOfStudy =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        urls.academicCalendar.areasOfStudy,
    );
export const requestSFUAcademicCalendarAPICourses =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        urls.academicCalendar.courses,
    );
export const requestSFUAcademicCalendarAPIPrograms =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        urls.academicCalendar.programs,
    );
