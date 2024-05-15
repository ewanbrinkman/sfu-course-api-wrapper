import { Campus, Day, SectionCode } from '@api-types';

interface SchedulePart {
    endDate: string;
    campus: Campus;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;
}

export default SchedulePart;
