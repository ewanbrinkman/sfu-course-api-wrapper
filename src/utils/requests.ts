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
        for (let i = 0; i < apiConfig.requestRetry.maxAttempts; i++) {
            try {
                const response = await axios.get(url);

                if (response.status === 200) {
                    return response;
                }
                // else {
                //     console.error(`Non-200 status code received (${response.status}) for: ${url}, retrying...`);
                // }
            } catch (error) {
                // console.error(`SFU API request failed for: ${url}, retrying...`);
            }
            
            if (i !== apiConfig.requestRetry.maxAttempts - 1) {
                // Wait before trying to request again. If all retries have been
                // used up, there is no need to delay, since no more requests
                // will be made.
                await new Promise(resolve => setTimeout(resolve, apiConfig.requestRetry.delay));
            }
        }

        throw new Error(`Retry limit (${apiConfig.requestRetry.maxAttempts}) reached for: ${url}`);
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
