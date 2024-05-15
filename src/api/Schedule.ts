import type { RawScheduleData, ScheduleData } from '@api-types';
import { SchedulePart } from '@api';
import { processRawScheduleData } from '@utils';

export default class Schedule
    extends Array<SchedulePart>
    implements ScheduleData
{
    constructor(scheduleData: ScheduleData) {
        const scheduleParts: SchedulePart[] = scheduleData.map(
            (schedulePartData) => new SchedulePart(schedulePartData),
        );
        super(...scheduleParts);
    }

    static fromRawScheduleData(rawScheduleData: RawScheduleData): Schedule {
        const scheduleData = processRawScheduleData(rawScheduleData);

        return new Schedule(scheduleData);
    }
}
