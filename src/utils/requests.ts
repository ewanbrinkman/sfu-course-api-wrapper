import urls from '@utils/urls.json';
import type {
    CourseOutlinesYear,
    CourseOutlinesTerm,
} from '@api-types';
import axios, { AxiosResponse } from 'axios';

function generateURLForSFUAPI(baseUrl: string, ...parameters: (number | string)[]) {
    return `${baseUrl}?${parameters.join('/')}`;
}

async function requestSFUAPI(
    baseUrl: string,
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    try {
        return await axios.get(
            generateURLForSFUAPI(baseUrl, ...parameters),
        );
    } catch (error) {
        throw error;
    }
}

export async function requestSFUCourseOutlinesAPI(
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAPI(urls.courseOutlines.baseUrl, ...parameters);
}

export async function requestSFUAcademicCalendarAPI(
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAPI(urls.academicCalendar.baseUrl, ...parameters);
}

async function requestSFUAcademicCalendarAPISection(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
    section: string,
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAcademicCalendarAPI(year, term, section, ...parameters);
}

export async function requestSFUAcademicCalendarAPIAreasOfStudy(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAcademicCalendarAPISection(year, term, urls.academicCalendar.areasOfStudy, ...parameters);
}

export async function requestSFUAcademicCalendarAPICourses(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAcademicCalendarAPISection(year, term, urls.academicCalendar.courses, ...parameters);
}

export async function requestSFUAcademicCalendarAPIPrograms(
    year: CourseOutlinesYear = 'current',
    term: CourseOutlinesTerm = 'current',
    ...parameters: (number | string)[]
): Promise<AxiosResponse> {
    return await requestSFUAcademicCalendarAPISection(year, term, urls.academicCalendar.programs, ...parameters);
}

