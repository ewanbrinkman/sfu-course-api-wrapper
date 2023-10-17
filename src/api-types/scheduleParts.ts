import type { SectionCode } from '@api-types';

export enum Campus {
    Burnaby = 'Burnaby',
    Surrey = 'Surrey',
    Vancouver = 'Vancouver',
}

export enum Day {
    Monday = 'Mo',
    Tuesday = 'Tu',
    Wednesday = 'We',
    Thursday = 'Th',
    Friday = 'Fr',
    Saturday = 'Sa',
    Sunday = 'Su',
}

export interface RawApiSchedulePart {
    endDate: string;
    campus: Campus;
    days: string;
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export interface ProcessedApiSchedulePart {
    endDate: string;
    campus: Campus;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}
