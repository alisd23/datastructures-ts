import { Maybe } from '../util/helper.types';
import { LinkedList } from './LinkedList.interface';

class DoublyLinkedNode<T> {
  public constructor(
    public value: T,
    public next: Maybe<DoublyLinkedNode<T>>,
    public previous: Maybe<DoublyLinkedNode<T>>,
  ) {}
}

/**
 * Double linked list.
 * Each node has a reference *both* to the next node and previous node in the list.
 * - Insert at head	  `O(1)`
 * - Insert at tail	  `O(1)`
 * - Remove at head	  `O(1)`
 * - Remove at tail	  `O(1)`
 * - Remove in middle	`O(n)`
 * - Search	          `O(n)`
 */
export class DoublyLinkedList<T> implements LinkedList<T> {
  private _head: Maybe<DoublyLinkedNode<T>> = null;
  private _tail: Maybe<DoublyLinkedNode<T>> = null;
  private _size = 0;

  public static fromArray<T>(items: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>(...items);
    return list;
  }

  public constructor(...items: T[]) {
    for (const item of items) {
      this.add(item);
    }
  }

  public get length() {
    return this._size;
  }

  public get isEmpty() {
    return this._size === 0;
  }

  public clear() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  public add(item: T) {
    this.addLast(item);
  }

  public addLast(item: T) {
    if (this.isEmpty || !this._tail) {
      this._head = this._tail = new DoublyLinkedNode(item, null, null);
    } else {
      this._tail.next = new DoublyLinkedNode(item, null, this._tail);
      this._tail = this._tail.next;
    }

    this._size++;
  }

  public addFirst(item: T) {
    if (this.isEmpty || !this._head) {
      this._tail = this._head = new DoublyLinkedNode(item, null, null);
    } else {
      this._head.previous = new DoublyLinkedNode(item, this._head, null);
      this._head = this._head.previous;
    }

    this._size++;
  }

  public addAt(item: T, index: number) {
    if (index === 0) {
      return this.addFirst(item);
    }

    const previousNode = this.peekNodeAt(index - 1);

    if (!previousNode) {
      throw new RangeError(`No item at index ${index}`);
    }
    const currentNode = previousNode.next;
    const newNode = new DoublyLinkedNode(item, null, null);

    if (!currentNode) {
      return this.addLast(item);
    }

    newNode.next = currentNode;
    newNode.previous = currentNode.previous;
    currentNode.previous = newNode;

    if (newNode.previous) {
      newNode.previous.next = newNode;
    }

    this._size++;
  }

  public peekFirst(): T {
    if (!this._head) {
      throw new RangeError('List is empty');
    }
    return this._head.value;
  }

  public peekLast(): T {
    if (!this._tail) {
      throw new RangeError('List is empty');
    }
    return this._tail.value;
  }

  public peekAt(index: number): T {
    const node = this.peekNodeAt(index);

    if (!node) {
      throw new RangeError(`No item at index ${index}`);
    }

    return node.value;
  }

  public contains(item: T): boolean {
    // Use iterator, loop through each element until found (or not)
    for (const el of this) {
      if (item === el) {
        return true;
      }
    }

    return false;
  }

  public removeFirst(): T {
    if (!this._head) {
      throw new RangeError('List is empty');
    }

    return this.removeNode(this._head);
  }

  public removeLast(): T {
    if (!this._tail) {
      throw new RangeError('List is empty');
    }

    return this.removeNode(this._tail);
  }

  public removeAt(index: number): T {
    const toRemove = this.peekNodeAt(index);

    if (!toRemove) {
      throw new RangeError(`No item at index ${index}`);
    }

    return this.removeNode(toRemove);
  }

  public remove(element: T): T {
    let node = this._head;

    while (node) {
      if (node.value === element) {
        return this.removeNode(node);
      }
      node = node.next;
    }

    throw new RangeError('No element found');
  }

  public toString(): string {
    const array = Array.from(this);
    return array.toString();
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    let node = this._head;

    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  //======================//
  //    Private methods   //
  //======================//

  private peekNodeAt(index: number): Maybe<DoublyLinkedNode<T>> {
    let pointer = 0;
    let node = this._head;

    if (index < 0) {
      return null;
    }

    while (pointer < index) {
      node = node?.next ?? null;
      if (!node) {
        return null;
      }
      pointer++;
    }

    return node;
  }

  private removeNode(toRemove: DoublyLinkedNode<T>): T {
    if (toRemove.previous) {
      toRemove.previous.next = toRemove.next;
    } else {
      this._head = toRemove.next;
    }
    if (toRemove.next) {
      toRemove.next.previous = toRemove.previous;
    } else {
      this._tail = toRemove.previous;
    }

    this._size--;
    return toRemove.value;
  }
}
