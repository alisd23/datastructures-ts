import { Maybe } from '../helpers/helper.types';
import { LinkedList } from './LinkedList';

class SinglyLinkedNode<T> {
  public constructor(
    public value: T,
    public next: Maybe<SinglyLinkedNode<T>>,
  ) {}
}

/**
 * Singly linked list.
 * Each node has a reference *only* to the next node in the list.
 * - Insert at head	`O(1)`
 * - Insert at tail	`O(n)`
 * - Remove at head	`O(1)`
 * - Remove at tail	`O(n)`
 * - Remove in middle	`O(n)`
 * - Search	`O(n)`
 */
export class SinglyLinkedList<T> implements LinkedList<T> {
  private _head: Maybe<SinglyLinkedNode<T>> = null;
  private _size = 0;

  public static fromArray<T>(items: T[]): SinglyLinkedList<T> {
    const list = new SinglyLinkedList<T>(...items);
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
    this._size = 0;
  }

  public add(item: T) {
    this.addLast(item);
  }

  public addLast(item: T) {
    if (this.isEmpty) {
      return this.addFirst(item);
    }
    const lastNode = this.peekNodeAt(this._size - 1);
    const newNode = new SinglyLinkedNode(item, null);

    if (lastNode) {
      lastNode.next = newNode;
    } else {
      this._head = newNode;
    }

    this._size++;
  }

  public addFirst(item: T) {
    const currentHead = this._head;
    this._head = new SinglyLinkedNode(item, currentHead);
    this._size++;
  }

  public addAt(item: T, index: number) {
    if (index === 0) {
      return this.addFirst(item);
    }

    const nodeBefore = this.peekNodeAt(index - 1);

    if (!nodeBefore) {
      throw new RangeError(`No item at index ${index}`);
    }

    nodeBefore.next = new SinglyLinkedNode(item, nodeBefore.next);
    this._size++;
  }

  public peekFirst(): T {
    return this.peekAt(0);
  }

  public peekLast(): T {
    return this.peekAt(this._size - 1);
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
      throw new RangeError(`No item at index 0`);
    }

    const toRemove = this._head;
    this._head = toRemove.next;
    this._size--;
    return toRemove.value;
  }

  public removeLast(): T {
    return this.removeAt(this._size - 1);
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this._head;

    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  public removeAt(index: number): T {
    if (index === 0) {
      return this.removeFirst();
    }

    const nodeBefore = this.peekNodeAt(index - 1);
    const toRemove = nodeBefore?.next;

    if (!nodeBefore || !toRemove) {
      throw new RangeError(`No item at index ${index}`);
    }

    nodeBefore.next = toRemove.next;
    this._size--;
    return toRemove.value;
  }

  //======================//
  //    Private methods   //
  //======================//

  private peekNodeAt(index: number): Maybe<SinglyLinkedNode<T>> {
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
}
