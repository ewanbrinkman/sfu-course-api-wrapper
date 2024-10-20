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
                // `InvalidResponseError` could either be because the API is
                // overwhelmed, or an actual error such as 404. An error
                // *actually* from `fetch` will be a network error.

                // If an `InvalidResponseError` is encountered, throw it anyways
                // right away. This is only an issue if the API is currently
                // being spammed and returns an error such as a 404 error when
                // the requested object does not exist. However, this shouldn't
                // be an issue if API requests are made with a slight delay
                // between requests. Note that it is possible for the API to
                // (incorrectly) return an empty list instead of a list of
                // objects when spammed too. Essentially, if the API request
                // type would normally return a 404 error or an empty list when
                // the request type response does not exist, the API could
                // return that error when being spammed, even if the requested
                // object does exist.
                if (error instanceof InvalidResponseError) {
                    throw error;
                }

                if (i !== apiConfig.requestRetry.maxAttempts - 1) {
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
