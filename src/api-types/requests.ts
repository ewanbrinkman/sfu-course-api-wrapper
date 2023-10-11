type CourseOutlinesCurrent = 'current';

export type CourseOutlinesYear = number | CourseOutlinesCurrent;

enum Term {
    Fall = 'fall',
    Spring = 'spring',
    Summer = 'summer',
}
export type CourseOutlinesTerm = Term | CourseOutlinesCurrent;
