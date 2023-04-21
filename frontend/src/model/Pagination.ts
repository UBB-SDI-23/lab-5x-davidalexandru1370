export default interface IPagination<T> {
    elements: T[];
    hasNext: boolean;
    hasPrevious: boolean;
}