import type { Campus, SectionCode, Day } from '@api-types';

export interface RawApiSchedulePart {
    roomNumber: number;
    endDate: string;
    campus: Campus;
    buildingCode: string;
    days: string;
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export interface ProcessedApiSchedulePart {
    roomNumber: number;
    endDate: string;
    campus: Campus;
    buildingCode: string;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}
