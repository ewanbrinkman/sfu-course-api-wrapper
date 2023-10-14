import type {
    RawApiSchedulePart,
    ProcessedApiSchedulePart,
    Campus,
    Day,
    SectionCode,
} from '@api-types';
import { convertStringDaysToEnumDays } from '@utils';

export default class SchedulePart implements ProcessedApiSchedulePart {
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

    constructor(schedulePartData: ProcessedApiSchedulePart) {
        Object.assign(this, schedulePartData);
    }

    static fromRawApiSchedulePart(
        rawApiSchedulePart: RawApiSchedulePart,
    ): SchedulePart {
        const processedApiSchedulePart: ProcessedApiSchedulePart = {
            roomNumber: rawApiSchedulePart.roomNumber,
            endDate: rawApiSchedulePart.endDate,
            campus: rawApiSchedulePart.campus,
            buildingCode: rawApiSchedulePart.buildingCode,
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
