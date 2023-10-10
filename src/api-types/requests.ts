type CourseOutlinesCurrent = 'current';

export type CourseOutlinesYear = number | CourseOutlinesCurrent;

type Term = 'fall' | 'spring' | 'summer';
export type CourseOutlinesTerm = Term | CourseOutlinesCurrent;
