export type CompareResult = -1 | 0 | 1;

export type Comparator<T> = (lhs: T, rhs: T) => CompareResult;
