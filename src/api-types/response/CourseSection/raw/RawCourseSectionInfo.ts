import { RawCourseBaseData, DeliveryMethod, Enrollment, DegreeLevel } from "@api-types";

interface RawCourseSectionInfo extends RawCourseBaseData {
    educationalGoals: string;
    deliveryMethod: DeliveryMethod;
    section: string;
    type: Enrollment;
    classNumber: number;
    departmentalUgradNotes: string;
    requiredReadingNotes: string;
    registrarNotes: string;
    shortNote?: string;
    outlinePath: string;
    term: string;
    requirements: string;
    gradingNotes: string;
    dept: string;
    degreeLevel: DegreeLevel;
    specialTopic: string;
    courseDetails: string;
    materials: string;
    name: string;
}

export default RawCourseSectionInfo;
