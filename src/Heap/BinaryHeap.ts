import { Comparator } from '../util/comparable';
import { exists } from '../util/exists';
import { Maybe } from '../util/helper.types';

/**
 * A complete binary heap, either min or max.
 * Each node has two children, and each child node `B` of a parent `A` obeys the
 * heap property (depending on the provided comparator).
 * @NOTE define comparator to turn heap into either *min* or *max* binary heap.
 * - Construction `O(n)`
 * - Add          `O(log(n))`
 * - Poll	        `O(log(n))`
 * - Peek         `O(1)`
 * - Contains	    `O(n)`
 * - Removal	    `O(n)`
 * @TODO Use HashTable to store position of each node in the heap, by value. This would
 * reduce contains complexity to `O(1)` and removal complexity to `O(log(n))`.
 */
export class BinaryHeap<T> {
  /**
   * Implemented as an array, E.g.
   * - Top node is index `0`)
   *  - children of node `0` are `1` and `2`
   *    - children of node `1` are `3` and `4`
   *    - children of node `2` are `5` and `6`
   * In general children of a node at index `N` are at index `2N + 1` and `2N + 2`
   */
  private _heap: T[] = [];
  protected comparator: Comparator<T>;

  /**
   * @param comparator a comparator function taking two heap elements. Should return:
   * - `0` if values are equal
   * - `1` if the 1st element is **higher** priority than the 2nd
   * - `-1` if the 1st element is **lower** priority than the 2nd
   * @param items initial values to be added to the heap
   */
  public constructor(comparator: Comparator<T>, items: T[] = []) {
    this.comparator = comparator;

    // Fast heap construction:
    // 1. Add all items to internal heap array
    // 2. then from the end to the start (reverse order), heapify-down each item
    // http://www.cs.umd.edu/~meesh/351/mount/lectures/lect14-heapsort-analysis-part.pdf
    this._heap = [...items];
    for (let i = this.size - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  public get size() {
    return this._heap.length;
  }

  /**
   * Add an element onto the binary heap, placing in to a valid position.
   * Always inserts bottom-left of the tree to maintain a "complete" binary tree.
   * @param element
   */
  public add(element: T): void {
    // Push element to end of heap (bottom-left) to keep heap as a complete binary tree
    this._heap.push(element);
    // Heapify up new element
    this.heapifyUp(this.size - 1);
  }

  /**
   * Remove the element at the top of the heap, and rebalance the tree to maintain
   * the heap property
   * @returns the element at the top of the heap
   * @throws RangeError if heap is empty
   */
  public poll(): T {
    if (this.size === 0) {
      throw new RangeError('Heap is empty');
    }
    // 1. Swap first with last element
    const first = this._heap[0];
    this.swapWithLast(0);

    // 2. Remove previous top element from heap
    this._heap.pop();

    // 2. Heapify down
    if (this.size > 0) {
      this.heapifyDown(0);
    }

    // 4. Return previous top element
    return first;
  }

  /**
   * Peek the element at the top of the heap, without removing it
   * @returns the element at the top of the heap
   * @throws RangeError if heap is empty
   */
  public peek(): T {
    return this._heap[0];
  }

  /**
   * Removes the element from anywhere in the heap, and rebalance the tree to maintain
   * the heap property.
   * @NOTE only removes the first matching element (by reference equivalence)
   * @returns the removed element
   * @throws RangeError if element is not found
   */
  public remove(element: T): T {
    // 1. Find position of element
    const index = this._heap.indexOf(element);

    if (index === -1) {
      throw new RangeError('No element found to remove');
    }

    // 2. Swap with last element
    this.swapWithLast(index);

    // 3. Remove element from end of heap
    this._heap.pop();

    // 4. Heapify up swapped element, then heapify down if needed.
    // We don't know whether the swapped element needs to go up or down here
    // Also check index is in range in case element is the last one
    if (this.size > 0 && index < this.size) {
      const newIndex = this.heapifyUp(index);

      // Heapify down if no changes were made in heapify up attempt
      if (newIndex === index) {
        this.heapifyDown(newIndex);
      }
    }

    // 5. Return removed element
    return element;
  }

  /**
   * Check whether the given element exists in the heap somewhere.
   */
  public contains(element: T): boolean {
    return this._heap.includes(element);
  }

  /**
   * Heapify-up the element at the give index, ensuring the heap property is held.
   * @param index index to heapify up
   * @returns new index of element being heapified-up
   */
  protected heapifyUp(index: number): number {
    let current = this._heap[index];

    if (!exists(current)) {
      throw new RangeError(`No element found at index ${index}`);
    }

    let currentIndex = index;
    let parentIndex = this.parentIndexOf(index);
    let parent: Maybe<T> = this._heap[parentIndex] ?? null;

    // If there is a parent and heap property is not held, swap parent and current child
    while (parent !== null && !this.heapPropertyHolds(parent, current)) {
      this._heap[parentIndex] = current;
      this._heap[currentIndex] = parent;
      currentIndex = parentIndex;
      parentIndex = this.parentIndexOf(currentIndex);
      parent = this._heap[parentIndex] ?? null;
    }

    return currentIndex;
  }

  /**
   * Heapify-down the element at the give index, ensuring the heap property is held.
   * @param index index to heapify down
   * @returns new index of element being heapified-down
   */
  protected heapifyDown(index: number): number {
    const current = this._heap[index];

    if (!exists(current)) {
      throw new RangeError(`No element found at index ${index}`);
    }

    let [leftChildIndex, rightChildIndex] = this.childrenIndexesOf(index);
    let leftChild: Maybe<T> = this._heap[leftChildIndex];
    let rightChild: Maybe<T> = this._heap[rightChildIndex];

    // While heap property does not hold for *either* child, heapify down
    while (
      (exists(leftChild) && !this.heapPropertyHolds(current, leftChild)) ||
      (exists(rightChild) && !this.heapPropertyHolds(current, rightChild))
    ) {
      const toSwapIndex = !exists(leftChild)
        ? rightChildIndex
        : !exists(rightChild)
          ? leftChildIndex
          : this.heapPropertyHolds(leftChild, rightChild)
            ? leftChildIndex
            : rightChildIndex;

      this.swap(toSwapIndex, index);

      index = toSwapIndex;
      [leftChildIndex, rightChildIndex] = this.childrenIndexesOf(toSwapIndex);
      leftChild = this._heap[leftChildIndex];
      rightChild = this._heap[rightChildIndex];
    }

    return index;
  }

  //========================//
  //     Private methods    //
  //========================//

  /**
   * Heap property holds for a parent/child pair if the parent has **equal or higher**
   * priority than the child.
   */
  private heapPropertyHolds(parent: T, child: T): boolean {
    const comparisonResult = this.comparator(parent, child);
    return comparisonResult !== -1;
  }

  private childrenIndexesOf(index: number): [number, number] {
    return [2 * index + 1, 2 * index + 2];
  }

  private parentIndexOf(index: number) {
    if (index === 0) {
      return -1;
    }
    const isEven = index % 2 === 0;
    return isEven ? (index - 2) / 2 : (index - 1) / 2;
  }

  private swap(indexA: number, indexB: number) {
    const a = this._heap[indexA];
    const b = this._heap[indexB];
    this._heap[indexA] = b;
    this._heap[indexB] = a;
  }

  private swapWithLast(index: number) {
    this.swap(index, this.size - 1);
  }
}
