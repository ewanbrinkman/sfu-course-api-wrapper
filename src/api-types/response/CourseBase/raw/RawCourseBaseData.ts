export default interface RawCourseBaseData {
    title: string;
    description: string;
    corequisites: string;
    prerequisites: string;
    number: string; // Needs to be a string, since could be "100w".
    notes: string;
    units: number;
    designation: string;
}
