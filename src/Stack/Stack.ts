import { DoublyLinkedList } from '../LinkedList/DoublyLinkedList';

/**
 * Stack data structure.
 * A list with FILO access, first to be pushed into the stack is the last to be popped.
 * - Push: `O(1)`
 * - Pop: `O(1)`
 * - Peek: `O(1)`
 */
export class Stack<T> implements Iterable<T> {
  private list = new DoublyLinkedList<T>();

  public static fromArray<T>(items: T[]): Stack<T> {
    const stack = new Stack<T>();
    for (const item of items) {
      stack.push(item);
    }
    return stack;
  }

  public constructor(initialEl?: T) {
    if (initialEl) {
      this.push(initialEl);
    }
  }

  /**
   * The current number of items in the stack
   */
  public get size() {
    return this.list.length;
  }

  /**
   * Whether the stack has no items
   */
  public get isEmpty() {
    return this.size === 0;
  }

  /**
   * Pushes an element onto the stack
   * @param element new element to add
   */
  public push(element: T) {
    this.list.addLast(element);
  }

  /**
   * Pop an element from the stack, retrieving and removing it.
   * @returns removed element
   * @throws RangeError if stack is empty
   */
  public pop(): T {
    if (this.size === 0) {
      throw new RangeError('Stack is empty');
    }

    return this.list.removeLast();
  }

  /**
   * Removes all elements from the stack
   */
  public clear(): void {
    this.list.clear();
  }

  /**
   * Peek an element from the stack, only retrieving without removing it.
   * @returns element at the top of the stack
   * @throws RangeError if stack is empty
   */
  public peek(): T {
    if (this.size === 0) {
      throw new RangeError('Stack is empty');
    }

    return this.list.peekLast();
  }

  /**
   * Checks if the given element is somewhere in the stack.
   * @param el element to check existence of in the stack
   * @returns boolean - `true` if element is in stack
   */
  public contains(el: T): boolean {
    return this.list.contains(el);
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.list[Symbol.iterator]();
  }

  public toString(): string {
    return this.list.toString();
  }
}
