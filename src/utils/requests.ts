import apiConfig from '@config/api.json';
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
        const url = generateURLForSFUApi(baseUrl, ...parameters);
        try {
            return await axios.get(url);
        } catch (error) {
            console.error(`SFU API request failed for: ${url}`);
            throw error;
        }
    };
}

export const requestSFUCourseOutlinesApi = generateRequestSFUApiFunction(
    apiConfig.endpoints.courseOutlines.baseUrl,
);
export const requestSFUAcademicCalendarApi = generateRequestSFUApiFunction(
    apiConfig.endpoints.academicCalendar.baseUrl,
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

export const requestSFUAcademicCalendarApiAreasOfStudy =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        apiConfig.endpoints.academicCalendar.areasOfStudy,
    );
export const requestSFUAcademicCalendarApiCourses =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        apiConfig.endpoints.academicCalendar.courses,
    );
export const requestSFUAcademicCalendarApiPrograms =
    generateRequestSFUAcademicCalendarApiSectionFunction(
        apiConfig.endpoints.academicCalendar.programs,
    );
