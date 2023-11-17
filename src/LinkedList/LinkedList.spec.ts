import { describe, expect, it } from 'vitest';
import { SinglyLinkedList } from './SinglyLinkedList';
import { DoublyLinkedList } from './DoublyLinkedList';

describe('LinkedList', () => {
  function sharedLinkedListTests(
    ListConstructor: typeof SinglyLinkedList | typeof DoublyLinkedList,
  ) {
    it('can create a linked list with no elements', () => {
      const list = new ListConstructor<number>();
      expect(list.length).toBe(0);
      expect(list.isEmpty).toBe(true);
      expect(() => list.peekFirst()).toThrowError(RangeError);
    });

    it('can create a linked list with initial single element', () => {
      const list = new ListConstructor<number>(1);
      expect(list.length).toBe(1);
      expect(list.isEmpty).toBe(false);
      expect(list.peekFirst()).toBe(1);
    });

    it('can create a linked list with initial multiple elements', () => {
      const list = new ListConstructor<number>(1, 2, 3, 4);
      expect(list.length).toBe(4);
      expect(list.isEmpty).toBe(false);
      expect(list.peekFirst()).toBe(1);
      expect(list.peekLast()).toBe(4);
    });

    describe('Multiple operations', () => {
      it('Many adds and some removes', () => {
        const list = new ListConstructor<string>('1');
        expect(list.length).toBe(1);
        list.addLast('2');
        list.addFirst('0');
        expect(list.length).toBe(3);
        expect(Array.from(list)).toEqual(['0', '1', '2']);
        list.add('3');
        expect(list.removeFirst()).toBe('0');
        expect(Array.from(list)).toEqual(['1', '2', '3']);
        expect(list.peekAt(1)).toBe('2');
        expect(list.removeAt(1)).toBe('2');
        expect(Array.from(list)).toEqual(['1', '3']);
        expect(list.length).toBe(2);
      });
    });

    describe('Get length', () => {
      it('can get length of linked list when empty', () => {
        const list = new ListConstructor<number>();
        expect(list.length).toBe(0);
      });

      it('can get length of linked list when 1 element', () => {
        const list = new ListConstructor<number>(1);
        expect(list.length).toBe(1);
      });

      it('can get length of linked list when many elements', () => {
        const list = new ListConstructor<number>(
          ...new Array(100).fill(null).map((_, i) => i),
        );
        expect(list.length).toBe(100);
      });
    });

    describe('Check is empty', () => {
      it('should return 0 for empty list', () => {
        const list = new ListConstructor<number>();
        expect(list.isEmpty).toBe(true);
      });

      it('should return correct length for list with 1 item', () => {
        const list = new ListConstructor<number>(1);
        expect(list.isEmpty).toBe(false);
      });

      it('should return correct length for list with many items', () => {
        const list = new ListConstructor<number>(
          ...new Array(100).fill(null).map((_, i) => i),
        );
        expect(list.isEmpty).toBe(false);
      });
    });

    describe('Clear list', () => {
      it('should do nothing if list empty', () => {
        const list = new ListConstructor<number>();
        list.clear();
        expect(list.length).toBe(0);
        expect(list.isEmpty).toBe(true);
        expect(() => list.peekFirst()).toThrowError(RangeError);
      });

      it('should remove 1 element for single element list', () => {
        const list = new ListConstructor<number>(1);
        list.clear();
        expect(list.length).toBe(0);
        expect(list.isEmpty).toBe(true);
        expect(() => list.peekFirst()).toThrowError(RangeError);
      });

      it('should remove all elements for list with multiple elements', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4, 5, 6, 7, 8);
        list.clear();
        expect(list.length).toBe(0);
        expect(list.isEmpty).toBe(true);
        expect(() => list.peekFirst()).toThrowError(RangeError);
      });
    });

    describe('Adding elements', () => {
      // list.add()
      it('add() should set first element when empty list', () => {
        const list = new ListConstructor<number>();
        list.add(5);
        expect(list.length).toBe(1);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(5);
        expect(list.peekLast()).toBe(5);
      });

      it('add() should add element to end of list - single element', () => {
        const list = new ListConstructor<number>(1);
        list.add(5);
        expect(list.length).toBe(2);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekLast()).toBe(5);
      });

      it('add() should add element to end of list - multiple element', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        list.add(5);
        expect(list.peekLast()).toBe(5);
        list.add(6);
        expect(list.length).toBe(6);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekLast()).toBe(6);
      });

      // list.addLast()
      it('addLast() should set first element when empty list', () => {
        const list = new ListConstructor<number>();
        list.add(5);
        expect(list.length).toBe(1);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(5);
        expect(list.peekLast()).toBe(5);
      });

      it('addLast() should add element to end of list - single element', () => {
        const list = new ListConstructor<number>(1);
        list.addLast(5);
        expect(list.length).toBe(2);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekLast()).toBe(5);
      });

      it('addLast() should add element to end of list - multiple element', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        list.addLast(5);
        expect(list.peekLast()).toBe(5);
        list.addLast(6);
        expect(list.length).toBe(6);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekLast()).toBe(6);
      });

      // list.addFirst()
      it('addFirst() should set first element when empty list', () => {
        const list = new ListConstructor<number>();
        list.addFirst(5);
        expect(list.length).toBe(1);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(5);
        expect(list.peekLast()).toBe(5);
      });

      it('addFirst() should add element to start of list - single element', () => {
        const list = new ListConstructor<number>(1);
        list.addFirst(5);
        expect(list.length).toBe(2);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(5);
        expect(list.peekLast()).toBe(1);
      });

      it('addFirst() should add element to start of list - multiple element', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        list.addFirst(5);
        expect(list.peekLast()).toBe(4);
        list.addFirst(6);
        expect(list.length).toBe(6);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(6);
        expect(list.peekLast()).toBe(4);
      });

      // list.addAt()
      it('addAt() should throw range error if index not in list', () => {
        const list = new ListConstructor<number>();
        expect(() => list.addAt(5, 1)).toThrowError(RangeError);
      });

      it('can add element to head with addAt(0) in empty list', () => {
        const list = new ListConstructor<number>();
        list.addAt(10, 0);
        expect(list.length).toBe(1);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(10);
        expect(list.peekLast()).toBe(10);
      });

      it('can add element to tail with addAt(X, 4) in list of size 4', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        list.addAt(5, 4);
        expect(list.length).toBe(5);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekLast()).toBe(5);
      });

      it('can add element to head with addAt(0) in list', () => {
        const list = new ListConstructor<number>(2, 3, 4);
        list.addAt(1, 0);
        expect(list.peekFirst()).toBe(1);
        list.addAt(0, 0);
        expect(list.length).toBe(5);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(0);
        expect(list.peekLast()).toBe(4);
      });

      it('can add element in the middle of the list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        list.addAt(10, 2);
        expect(list.length).toBe(5);
        expect(list.isEmpty).toBe(false);
        expect(list.peekFirst()).toBe(1);
        expect(list.peekAt(2)).toBe(10);
        expect(list.peekLast()).toBe(4);
        expect(Array.from(list)).toEqual([1, 2, 10, 3, 4]);
      });
    });

    describe('Peeking elements', () => {
      // list.peekFirst()
      it('peekFirst() should throw range error if list empty', () => {
        const list = new ListConstructor<number>();
        expect(() => list.peekFirst()).toThrowError(RangeError);
      });

      it('can read element at start of list with peekFirst() - single element', () => {
        const list = new ListConstructor<number>(1);
        expect(list.peekFirst()).toBe(1);
        // Test element not removed
        expect(list.peekFirst()).toBe(1);
        expect(list.length).toBe(1);
      });

      it('can read element at start of list with peekFirst() - multiple element', () => {
        const list = new ListConstructor<number>(1, 2);
        list.add(3);
        list.addFirst(0);
        expect(list.peekFirst()).toBe(0);
        // Test element not removed
        expect(list.peekFirst()).toBe(0);
        expect(list.length).toBe(4);
      });

      // list.peekLast()
      it('peekLast() should throw range error if list empty', () => {
        const list = new ListConstructor<number>();
        expect(() => list.peekLast()).toThrowError(RangeError);
      });

      it('can read element at start of list with peekLast() - single element', () => {
        const list = new ListConstructor<number>(1);
        expect(list.peekLast()).toBe(1);
        // Test element not removed
        expect(list.peekLast()).toBe(1);
        expect(list.length).toBe(1);
      });

      it('can read element at start of list with peekLast() - multiple element', () => {
        const list = new ListConstructor<number>(1, 2);
        list.add(3);
        list.addFirst(0);
        expect(list.peekLast()).toBe(3);
        // Test element not removed
        expect(list.peekLast()).toBe(3);
        expect(list.length).toBe(4);
      });

      // list.peekAt
      it('peekLast() should throw range error if list empty', () => {
        const list = new ListConstructor<number>();
        expect(() => list.peekAt(0)).toThrowError(RangeError);
      });

      it('peekLast() should throw range error if index not in range', () => {
        const list = new ListConstructor<number>(1, 2, 3);
        expect(() => list.peekAt(3)).toThrowError(RangeError);
      });

      it('can read element at start/end of list with peekAt() - single elements', () => {
        const list = new ListConstructor<number>(1);
        expect(list.peekAt(0)).toBe(1);
        // Test element not removed
        expect(list.peekAt(0)).toBe(1);
        expect(list.length).toBe(1);
      });

      it('can read element at start of list with peekAt() - multiple elements', () => {
        const list = new ListConstructor<number>(1, 2);
        list.add(3);
        list.addFirst(0);
        expect(list.peekAt(0)).toBe(0);
        // Test element not removed
        expect(list.peekAt(0)).toBe(0);
        expect(list.length).toBe(4);
      });

      it('can read element at end of list with peekAt() - multiple elements', () => {
        const list = new ListConstructor<number>(1, 2);
        list.add(3);
        list.addFirst(0);
        expect(list.peekAt(3)).toBe(3);
        // Test element not removed
        expect(list.peekAt(3)).toBe(3);
        expect(list.length).toBe(4);
      });

      it('can peek at element in middle of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.peekAt(2)).toBe(3);
        // Test element not removed
        expect(list.peekAt(2)).toBe(3);
        expect(list.length).toBe(4);
      });
    });

    describe('Contains element', () => {
      it('returns true if element found at start of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.contains(1)).toBe(true);
      });

      it('returns true if element found at start of list - single element', () => {
        const list = new ListConstructor<number>(1);
        expect(list.contains(1)).toBe(true);
      });

      it('returns true if element found at end of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.contains(4)).toBe(true);
      });

      it('returns true if element found in middle of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4, 5);
        expect(list.contains(2)).toBe(true);
      });

      it('returns false if element not found', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4, 5);
        expect(list.contains(6)).toBe(false);
      });
    });

    describe('Removing elements', () => {
      // list.removeFirst()
      it('removeFirst() throws RangeError if list is empty', () => {
        const list = new ListConstructor<number>();
        expect(() => list.removeFirst()).toThrowError(RangeError);
      });

      it('removeFirst() returns and removes first element - single item', () => {
        const list = new ListConstructor<number>(10);
        expect(list.removeFirst()).toBe(10);
        expect(list.length).toBe(0);
      });

      it('removeFirst() returns and removes first element - multiple items', () => {
        const list = new ListConstructor<number>(10, 11, 12, 13);
        expect(list.removeFirst()).toBe(10);
        expect(list.removeFirst()).toBe(11);
        expect(list.removeFirst()).toBe(12);
        expect(list.length).toBe(1);
      });

      // list.removeLast()
      it('removeLast() throws RangeError if list is empty', () => {
        const list = new ListConstructor<number>();
        expect(() => list.removeLast()).toThrowError(RangeError);
      });

      it('removeLast() returns and removes last element - single item', () => {
        const list = new ListConstructor<number>(10);
        expect(list.removeLast()).toBe(10);
        expect(list.length).toBe(0);
      });

      it('removeLast() returns and removes last element - multiple items', () => {
        const list = new ListConstructor<number>(10, 11, 12, 13);
        expect(list.removeLast()).toBe(13);
        expect(list.removeLast()).toBe(12);
        expect(list.removeLast()).toBe(11);
        expect(list.length).toBe(1);
      });

      // list.removeAt()
      it('removeAt() throws range error if index not in list', () => {
        const list = new ListConstructor<number>();
        expect(() => list.removeAt(0)).toThrowError(RangeError);
      });

      it('can remove element from head with removeAt(0)', () => {
        const list = new ListConstructor<number>(10, 11, 12);
        expect(list.removeAt(0)).toBe(10);
        expect(list.removeAt(0)).toBe(11);
        expect(list.removeAt(0)).toBe(12);
        expect(list.length).toBe(0);
      });

      it('can remove element from tail with removeAt() - multiple elements', () => {
        const list = new ListConstructor<number>(10, 11, 12, 13);
        expect(list.removeAt(3)).toBe(13);
        expect(list.removeAt(2)).toBe(12);
        expect(list.removeAt(1)).toBe(11);
        expect(list.removeAt(0)).toBe(10);
        expect(list.length).toBe(0);
      });

      it('can remove element in the middle of the list', () => {
        const list = new ListConstructor<number>(10, 11, 12, 13);
        expect(list.removeAt(1)).toBe(11);
        expect(list.removeAt(1)).toBe(12);
        expect(list.length).toBe(2);
      });

      // list.remove(element)
      it('should throw error if element not found', () => {
        const list = new ListConstructor<number>(10);
        expect(() => list.remove(99)).toThrowError(RangeError);
        expect(list.length).toBe(1);
        expect(list.isEmpty).toBe(false);
      });

      it('can remove an element reference - single item', () => {
        const list = new ListConstructor<number>(10);
        expect(list.remove(10)).toBe(10);
        expect(list.length).toBe(0);
        expect(list.isEmpty).toBe(true);
      });

      it('can remove an element reference - start of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.remove(1)).toBe(1);
        expect(list.length).toBe(3);
        expect(list.isEmpty).toBe(false);
        expect(Array.from(list)).toEqual([2, 3, 4]);
      });

      it('can remove an element reference - middle of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.remove(3)).toBe(3);
        expect(list.length).toBe(3);
        expect(list.isEmpty).toBe(false);
        expect(Array.from(list)).toEqual([1, 2, 4]);
      });

      it('can remove an element reference - end of list', () => {
        const list = new ListConstructor<number>(1, 2, 3, 4);
        expect(list.remove(4)).toBe(4);
        expect(list.length).toBe(3);
        expect(list.isEmpty).toBe(false);
        expect(Array.from(list)).toEqual([1, 2, 3]);
      });
    });

    describe('Iterator', () => {
      it('can iterate with for...of', () => {
        const array = [1, 2, 3, 4];
        const list = ListConstructor.fromArray(array);
        expect(list.length).toBe(4);

        let i = 0;
        for (const item of list) {
          expect(item).toBe(array[i]);
          i++;
        }
      });

      it('can spread as an array', () => {
        const array = [1, 2, 3, 4];
        const list = ListConstructor.fromArray(array);
        expect(list.length).toBe(4);
        expect([...list]).toEqual(array);
      });
    });

    describe('To string', () => {
      it('should display list like array - empty list', () => {
        const list = new ListConstructor<number>();
        expect(list.toString()).toBe('');
      });

      it('should display list like array - numbers', () => {
        const list = new ListConstructor<number>(1, 2, 3);
        expect(list.toString()).toBe('1,2,3');
      });

      it('should display list like array - strings', () => {
        const list = new ListConstructor<string>('1', '2', '3');
        expect(list.toString()).toBe('1,2,3');
      });
    });
  }

  describe('Singly-linked List', () => {
    sharedLinkedListTests(SinglyLinkedList);
  });

  describe('Doubly-linked List', () => {
    sharedLinkedListTests(DoublyLinkedList);
  });
});
