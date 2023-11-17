/**
 * Common interface for a LinkedList to be implemented concretely by
 * singly or doubly-linked list implementations.
 */
export interface LinkedList<T> {
  /**
   * Get the number of items in the list
   */
  get length(): number;
  /**
   * Whether the list is empty
   */
  get isEmpty(): boolean;
  /**
   * Clear the list of all elements
   */
  clear(): void;
  /**
   * Push an element to the end (tail) of the list
   */
  add(item: T): void;
  /**
   * Push an element to the end (tail) of the list
   */
  addLast(item: T): void;
  /**
   * Adds an element to the start (head) of the list
   */
  addFirst(item: T): void;
  /**
   * Add an element at the given index in the list.
   * @throws `RangeError` if index is out of bounds of current list
   */
  addAt(item: T, index: number): void;
  /**
   * Get the item at the head of the list
   * @throws `RangeError` if index is out of bounds of current list
   */
  peekFirst(): T;
  /**
   * Get the item at the tail of the list
   * @throws `RangeError` if index is out of bounds of current list
   */
  peekLast(): T;
  /**
   * Get the item at the provided index
   * @param index
   * @throws `RangeError` if index is out of bounds of current list
   */
  peekAt(index: number): T;
  /**
   * Checks whether the given item exists in the list (by reference equality)
   * @param item the item to check existence of
   */
  contains(item: T): boolean;
  /**
   * Retrieve and remove the element at the head of the list
   * @throws `RangeError` if index is out of bounds of current list
   */
  removeFirst(): T;
  /**
   * Retrieve and remove the element at the tail of the list
   * @throws `RangeError` if index is out of bounds of current list
   */
  removeLast(): T;
  /**
   * Retrieve and remove the element at the given index
   * @param index
   * @throws `RangeError` if index is out of bounds of current list
   */
  removeAt(index: number): T;
  /**
   * The iterator implementation for the list. The list can then be iterated over
   * with `for...of` etc.
   */
  [Symbol.iterator](): IterableIterator<T>;
}
