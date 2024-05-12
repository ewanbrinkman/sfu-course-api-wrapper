import { Campus, SectionCode } from '@api-types';

interface RawSchedulePartData {
    endDate: string;
    campus: Campus;
    days: string;
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export default RawSchedulePartData;
