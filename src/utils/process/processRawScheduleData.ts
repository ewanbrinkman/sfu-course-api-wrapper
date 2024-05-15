import type { RawScheduleData, ScheduleData } from '@api-types';
import { processRawSchedulePartData } from '@utils';

function processRawScheduleData(
    rawScheduleData: RawScheduleData,
): ScheduleData {
    return rawScheduleData.map((rawSchedulePartData) => {
        return processRawSchedulePartData(rawSchedulePartData);
    });
}

export default processRawScheduleData;
