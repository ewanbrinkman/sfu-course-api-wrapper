import type { SchedulePartData, RawSchedulePartData } from '@api-types';
import { processStringDays } from '@utils';

function processRawSchedulePartData(
    rawSchedulePartData: RawSchedulePartData,
): SchedulePartData {
    return {
        endDate: rawSchedulePartData.endDate,
        campus: rawSchedulePartData.campus,
        days: processStringDays(rawSchedulePartData.days),
        sectionCode: rawSchedulePartData.sectionCode,
        startTime: rawSchedulePartData.startTime,
        isExam: rawSchedulePartData.isExam,
        endTime: rawSchedulePartData.endDate,
        startDate: rawSchedulePartData.startTime,
    };
}

export default processRawSchedulePartData;
