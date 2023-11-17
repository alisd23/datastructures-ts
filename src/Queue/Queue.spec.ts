import { describe, expect, it } from 'vitest';
import { Queue } from '../Queue/Queue';

describe('Queue', () => {
  it('can initialise with an empty queue', () => {
    const queue = new Queue<number>();
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
  });

  it('can initialise with elements', () => {
    const queue = new Queue<number>(1, 2, 3, 4);
    expect(queue.size).toBe(4);
    expect(queue.isEmpty).toBe(false);
    expect(queue.peek()).toBe(1);
  });

  describe('Get size', () => {
    it('can get size of queue - empty', () => {
      const queue = new Queue<number>();
      expect(queue.size).toBe(0);
    });

    it('can get size of queue - single element', () => {
      const queue = new Queue<number>();
      queue.enqueue(2);
      expect(queue.size).toBe(1);
    });

    it('can get size of queue - multiple elements', () => {
      const queue = Queue.fromArray([1, 2, 3]);
      expect(queue.size).toBe(3);
    });
  });

  describe('Check if empty', () => {
    it('should return 0 for empty queue', () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty).toBe(true);
    });

    it('should return correct length for queue with 1 item', () => {
      const queue = new Queue<number>(1);
      expect(queue.isEmpty).toBe(false);
    });

    it('should return correct length for queue with many items', () => {
      const queue = new Queue<number>();
      for (let i = 0; i < 100; i++) {
        queue.enqueue(i);
      }
      expect(queue.isEmpty).toBe(false);
    });
  });

  describe('Add elements (enqueue)', () => {
    it('can add onto an empty queue', () => {
      const queue = new Queue<number>();
      queue.enqueue(3);
      expect(queue.isEmpty).toBe(false);
      expect(queue.size).toBe(1);
      expect(queue.peek()).toBe(3);
    });

    it('can add onto an queue - single item', () => {
      const queue = new Queue<number>(1);
      queue.enqueue(3);
      expect(queue.isEmpty).toBe(false);
      expect(queue.size).toBe(2);
      expect(queue.peek()).toBe(1);
    });

    it('can add onto an queue - multiple items', () => {
      const queue = Queue.fromArray([1, 2, 3]);
      expect(queue.isEmpty).toBe(false);
      expect(queue.size).toBe(3);
      expect(queue.peek()).toBe(1);
      expect(Array.from(queue)).toEqual([1, 2, 3]);
    });
  });

  describe('Remove elements (dequeue)', () => {
    it('should throw RangeError if trying to dequeue an empty queue', () => {
      const queue = new Queue<number>();
      expect(() => queue.dequeue()).toThrowError(RangeError);
    });

    it('can dequeue from queue - single element', () => {
      const queue = new Queue<number>(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });

    it('can dequeue from queue - multiple element', () => {
      const queue = Queue.fromArray([1, 2, 3]);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.size).toBe(1);
      expect(queue.isEmpty).toBe(false);
    });
  });

  describe('Clear queue', () => {
    it('should do nothing if queue empty', () => {
      const queue = new Queue<number>();
      queue.clear();
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
      expect(() => queue.peek()).toThrowError(RangeError);
    });

    it('should remove 1 element for single element queue', () => {
      const queue = new Queue<number>(1);
      queue.clear();
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
      expect(() => queue.peek()).toThrowError(RangeError);
    });

    it('should remove all elements for queue with multiple elements', () => {
      const queue = Queue.fromArray([1, 2, 3, 4, 5, 6, 7]);
      queue.clear();
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
      expect(() => queue.peek()).toThrowError(RangeError);
    });

    describe('peek', () => {
      it('should throw RangeError if trying to peek an empty queue', () => {
        const queue = new Queue<number>();
        expect(() => queue.peek()).toThrowError(RangeError);
      });

      it('can peek front of queue - single element', () => {
        const queue = new Queue<number>(1);
        expect(queue.peek()).toBe(1);
        // Check queue same size
        expect(queue.size).toBe(1);
        expect(queue.isEmpty).toBe(false);
      });

      it('can peek front of queue - multiple elements', () => {
        const queue = Queue.fromArray([1, 2, 3]);
        expect(queue.peek()).toBe(1);
        // Check queue same size
        expect(queue.size).toBe(3);
        expect(queue.isEmpty).toBe(false);
      });
    });

    describe('Search queue', () => {
      it('should return false if element not found', () => {
        const queue = Queue.fromArray([1, 2, 3]);
        expect(queue.contains(4)).toBe(false);
      });

      it('should return true if element found - front of queue', () => {
        const queue = Queue.fromArray([1, 2]);
        expect(queue.contains(2)).toBe(true);
      });

      it('should return true if element found - middle of queue', () => {
        const queue = Queue.fromArray([1, 2, 3, 4]);
        expect(queue.contains(3)).toBe(true);
      });

      it('should return true if element found - back of queue', () => {
        const queue = Queue.fromArray([1, 2, 3, 4]);
        expect(queue.contains(4)).toBe(true);
      });
    });

    describe('Iterator', () => {
      it('can iterate with for...of', () => {
        const array = [1, 2, 3, 4];
        const queue = Queue.fromArray(array);
        expect(queue.size).toBe(4);

        let i = 0;
        for (const item of queue) {
          expect(item).toBe(array[i]);
          i++;
        }
      });

      it('can spread as an array', () => {
        const array = [1, 2, 3, 4];
        const queue = Queue.fromArray(array);
        expect(queue.size).toBe(4);
        expect([...queue]).toEqual([1, 2, 3, 4]);
      });
    });

    describe('To string', () => {
      it('should display queue like array - empty queue', () => {
        const queue = new Queue<number>();
        expect(queue.toString()).toBe('');
      });

      it('should display queue like array - numbers', () => {
        const queue = Queue.fromArray([1, 2, 3]);
        expect(queue.toString()).toBe('1,2,3');
      });

      it('should display queue like array - strings', () => {
        const queue = Queue.fromArray(['1', '2', '3']);
        expect(queue.toString()).toBe('1,2,3');
      });
    });
  });
});
