import apiConfig from '@config/api.json';
import type { CourseOutlinesYear, CourseOutlinesTerm } from '@api-types';

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
                }
            } catch (error) {}

            // console.error(`SFU API request failed for: ${url}, retrying...`);

            if (i !== apiConfig.requestRetry.maxAttempts - 1) {
                await new Promise((resolve) =>
                    setTimeout(resolve, apiConfig.requestRetry.delay),
                );
            }
        }

        throw new Error(
            `Retry limit (${apiConfig.requestRetry.maxAttempts}) reached for: ${url}`,
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
