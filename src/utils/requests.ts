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
                // If an error like 404 or whatnot was returned from the SFU
                // API, that means `fetch` was able to connect and get a
                // response from the server. This happens if
                // `InvalidResponseError` is thrown, since that means a response
                // was received, but `response.ok` is not true. Anyways, if a
                // response is received, throw an error right away. If
                // `InvalidResponseError` was not the error thrown, that means
                // `fetch` threw an error. `fetch` does this for things like
                // network errors. This can happen if the SFU API is being
                // spammed and momentarily goes down. So, if some netork-related
                // error happens, try making the request more times. That way,
                // there is a chance the request could actually succeed. If
                // after a maximum never of retry attempts errors are still
                // received, throw an error to represent failure.
                if (error instanceof InvalidResponseError) {
                    throw error;
                }

                if (i !== apiConfig.requestRetry.maxAttempts - 1) {
                    console.error(
                        error,
                        `SFU API request failed for: '${url}', retrying after ${apiConfig.requestRetry.delay} ms...`,
                    );
                    await new Promise((resolve) =>
                        setTimeout(resolve, apiConfig.requestRetry.delay),
                    );
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
