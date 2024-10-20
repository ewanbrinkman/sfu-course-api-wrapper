import apiConfig from '@config/api.json';
import type { CourseOutlinesYear, CourseOutlinesTerm } from '@api-types';
import { InvalidResponseError, RetryLimitReachedError } from '@errors';

function generateURLForSFUApi(
    baseUrl: string,
    ...parameters: (number | string)[]
) {
    return `${baseUrl}?${parameters.join('/')}`;
}

type requestSFUApiFunction = (
    ...parameters: (number | string)[]
) => Promise<Response>;

function generateRequestSFUApiFunction(baseUrl: string): requestSFUApiFunction {
    return async (...parameters: (number | string)[]): Promise<Response> => {
        const url = generateURLForSFUApi(baseUrl, ...parameters);
        for (let i = 0; i < apiConfig.requestRetry.maxAttempts; i++) {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    return response;
                } else {
                    throw new InvalidResponseError(response.status, url);
                }
            } catch (error) {
                if (i !== apiConfig.requestRetry.maxAttempts - 1) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, apiConfig.requestRetry.delay),
                    );
                } else {
                    // `InvalidResponseError` could either be because the API is
                    // overwhelmed, or an actual error such as 404. An error
                    // *actually* from `fetch` will be a network error. Since an
                    // error like 404 is unclear (whether it is from the API
                    // being spammed or an actual 404 error), try again. The
                    // issue with this is that an actual 404 will keep getting
                    // requested. This is better than returning 404 right away
                    // when it is just the API being spammed.
                    if (error instanceof InvalidResponseError) {
                        throw error;
                    }
                }
            }
        }

        throw new RetryLimitReachedError(
            apiConfig.requestRetry.maxAttempts,
            url,
        );
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
) => Promise<Response>;

function generateRequestSFUAcademicCalendarApiSectionFunction(
    section: string,
): requestSFUAcademicCalendarApiSectionFunction {
    return async (
        year: CourseOutlinesYear = 'current',
        term: CourseOutlinesTerm = 'current',
        ...parameters: (number | string)[]
    ): Promise<Response> => {
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
