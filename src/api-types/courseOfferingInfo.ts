export enum DeliveryMethod {
    InPerson = 'In Person',
    DistanceEducation = 'Distance Education',
}

export enum DegreeLevel {
    Undergraduate = 'UGRD',
    Graduate = 'GRAD',
}

export enum Enrollment {
    EnrollmentSection = 'e',
    NonEnrollment = 'n',
}

export enum InstructorRole {
    PrimaryInstructor = 'PI',
    SecondaryInstructor = 'SI',
}

export enum Day {
    Monday = 'Mo',
    Tuesday = 'Tu',
    Wednesday = 'We',
    Thursday = 'Th',
    Friday = 'Fr',
    Saturday = 'Sa',
    Sunday = 'Su',
}

export enum Campus {
    Burnaby = 'Burnaby',
    Surrey = 'Surrey',
    Vancouver = 'Vancouver',
}

export enum SectionCode {
    Lecture = 'LEC',
    Tutorial = 'TUT',
    Lab = 'LAB',
    Seminar = 'SEM',
}

export interface GradingScheme {
    description: string;
    weight: number;
}

export interface Textbook {
    details: string;
}
