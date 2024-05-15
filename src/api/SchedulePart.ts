import type {
    RawSchedulePartData,
    SchedulePartData,
    Campus,
    Day,
    SectionCode,
} from '@api-types';
import { processRawSchedulePartData } from '@utils';

export default class SchedulePart implements SchedulePartData {
    endDate: string;
    campus: Campus;
    days: Day[];
    sectionCode: SectionCode;
    startTime: string;
    isExam: boolean;
    endTime: string;
    startDate: string;

    constructor(schedulePartData: SchedulePartData) {
        this.endDate = schedulePartData.endDate;
        this.campus = schedulePartData.campus;
        this.days = schedulePartData.days;
        this.sectionCode = schedulePartData.sectionCode;
        this.startTime = schedulePartData.startTime;
        this.isExam = schedulePartData.isExam;
        this.endTime = schedulePartData.endTime;
        this.startDate = schedulePartData.startDate;
    }

    static fromRawSchedulePartData(
        rawSchedulePartData: RawSchedulePartData,
    ): SchedulePart {
        const schedulePartData =
            processRawSchedulePartData(rawSchedulePartData);

        return new SchedulePart(schedulePartData);
    }
}
