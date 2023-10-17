import type {
    RawApiSchedulePart,
    ProcessedApiSchedulePart,
    Campus,
    Day,
    SectionCode,
} from '@api-types';
import { convertStringDaysToEnumDays } from '@utils';

export default class SchedulePart {
    endDate: string;
    campus: Campus;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;

    constructor(schedulePartData: ProcessedApiSchedulePart) {
        Object.assign(this, schedulePartData);
    }

    static fromRawApiSchedulePart(
        rawApiSchedulePart: RawApiSchedulePart,
    ): SchedulePart {
        const processedApiSchedulePart: ProcessedApiSchedulePart = {
            endDate: rawApiSchedulePart.endDate,
            campus: rawApiSchedulePart.campus,
            days: convertStringDaysToEnumDays(rawApiSchedulePart.days),
            sectionCode: rawApiSchedulePart.sectionCode,
            startTime: rawApiSchedulePart.startTime,
            isExam: rawApiSchedulePart.isExam,
            endTime: rawApiSchedulePart.endDate,
            startDate: rawApiSchedulePart.startTime,
        };

        return new SchedulePart(processedApiSchedulePart);
    }
}
