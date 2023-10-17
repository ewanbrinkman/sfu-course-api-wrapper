export type CourseOutlinesCurrent = 'current';

export type CourseOutlinesYear = number | CourseOutlinesCurrent;

export type Term = 'fall' | 'spring' | 'summer';
export type CourseOutlinesTerm = Term | CourseOutlinesCurrent;
