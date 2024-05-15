export type Term = 'fall' | 'spring' | 'summer';
export type CourseOutlinesCurrent = 'current';

export type CourseOutlinesYear = number | CourseOutlinesCurrent;
export type CourseOutlinesTerm = Term | CourseOutlinesCurrent;
