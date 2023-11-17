import { DoublyLinkedList } from '../LinkedList/DoublyLinkedList';

/**
 * Queue data structure.
 * A list with FIFO access, first to be queued into the stack is the first to be dequeued.
 * - Enqueue    `O(1)`
 * - Dequeue	  `O(1)`
 * - Peek       `O(1)`
 * - Contains	  `O(n)`
 * - Removal	  `O(n)`
 */
export class Queue<T> implements Iterable<T> {
  private list = new DoublyLinkedList<T>();

  public static fromArray<T>(items: T[]): Queue<T> {
    return new Queue(...items);
  }

  public constructor(...items: T[]) {
    for (const item of items) {
      this.enqueue(item);
    }
  }

  /**
   * The current number of items in the queue
   */
  public get size() {
    return this.list.length;
  }

  /**
   * Whether the queue has no items
   */
  public get isEmpty() {
    return this.size === 0;
  }

  /**
   * Add an element to the **back** of the queue
   * @param element
   */
  public enqueue(element: T): void {
    this.list.addLast(element);
  }

  /**
   * Dequeue (remove/poll) the element at the **front** of the queue.
   * @returns the removed element
   * @throws RangeError if the queue is empty
   */
  public dequeue(): T {
    if (this.isEmpty) {
      throw new RangeError('Queue is empty');
    }

    return this.list.removeFirst();
  }

  /**
   * Removes all elements from the queue
   */
  public clear(): void {
    this.list.clear();
  }

  /**
   * Peek (read) the element at the **front** of the queue.
   * @returns the element currently at the front of the queue
   * @throws RangeError if the queue is empty
   */
  public peek(): T {
    if (this.isEmpty) {
      throw new RangeError('Queue is empty');
    }

    return this.list.peekFirst();
  }

  /**
   * Checks if the given element is somewhere in the stack.
   * @param el element to check existence of in the stack
   * @returns boolean - `true` if element is in stack
   */
  public contains(element: T): boolean {
    return this.list.contains(element);
  }

  /**
   * Removes the provided element from the queue (by referential equivalence)
   * @param element the element to remove
   * @returns the removed element
   * @throws RangeError if element is not in array
   */
  public remove(element: T): T {
    return this.list.remove(element);
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.list[Symbol.iterator]();
  }

  public toString(): string {
    return this.list.toString();
  }
}
