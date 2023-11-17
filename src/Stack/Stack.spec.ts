import { describe, expect, it } from 'vitest';
import { Stack } from '../Stack/Stack';

describe('Stack', () => {
  it('can initialise with an empty stack', () => {
    const stack = new Stack<number>();
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);
  });

  it('can initialise with a single element', () => {
    const stack = new Stack<number>(1);
    expect(stack.size).toBe(1);
    expect(stack.isEmpty).toBe(false);
    expect(stack.peek()).toBe(1);
  });

  describe('Get size', () => {
    it('can get size of stack - empty', () => {
      const stack = new Stack<number>();
      expect(stack.size).toBe(0);
    });

    it('can get size of stack - single element', () => {
      const stack = new Stack<number>();
      stack.push(2);
      expect(stack.size).toBe(1);
    });

    it('can get size of stack - multiple elements', () => {
      const stack = Stack.fromArray([1, 2, 3]);
      expect(stack.size).toBe(3);
    });
  });

  describe('Check if empty', () => {
    it('should return 0 for empty stack', () => {
      const stack = new Stack<number>();
      expect(stack.isEmpty).toBe(true);
    });

    it('should return correct length for stack with 1 item', () => {
      const stack = new Stack<number>(1);
      expect(stack.isEmpty).toBe(false);
    });

    it('should return correct length for stack with many items', () => {
      const stack = new Stack<number>();
      for (let i = 0; i < 100; i++) {
        stack.push(i);
      }
      expect(stack.isEmpty).toBe(false);
    });
  });

  describe('Add elements (push)', () => {
    it('can add onto an empty stack', () => {
      const stack = new Stack<number>();
      stack.push(3);
      expect(stack.isEmpty).toBe(false);
      expect(stack.size).toBe(1);
      expect(stack.peek()).toBe(3);
    });

    it('can add onto an stack - single item', () => {
      const stack = new Stack<number>(1);
      stack.push(3);
      expect(stack.isEmpty).toBe(false);
      expect(stack.size).toBe(2);
      expect(stack.peek()).toBe(3);
    });

    it('can add onto an stack - multiple items', () => {
      const stack = Stack.fromArray([1, 2, 3]);
      expect(stack.isEmpty).toBe(false);
      expect(stack.size).toBe(3);
      expect(stack.peek()).toBe(3);
    });
  });

  describe('Remove elements (pop)', () => {
    it('should throw RangeError if trying to pop an empty stack', () => {
      const stack = new Stack<number>();
      expect(() => stack.pop()).toThrowError(RangeError);
    });

    it('can pop from stack - single element', () => {
      const stack = new Stack<number>(1);
      expect(stack.pop()).toBe(1);
      expect(stack.size).toBe(0);
      expect(stack.isEmpty).toBe(true);
    });

    it('can pop from stack - multiple element', () => {
      const stack = Stack.fromArray([1, 2, 3]);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.size).toBe(1);
      expect(stack.isEmpty).toBe(false);
    });
  });

  describe('Clear stack', () => {
    it('should do nothing if stack empty', () => {
      const stack = new Stack<number>();
      stack.clear();
      expect(stack.size).toBe(0);
      expect(stack.isEmpty).toBe(true);
      expect(() => stack.peek()).toThrowError(RangeError);
    });

    it('should remove 1 element for single element stack', () => {
      const stack = new Stack<number>(1);
      stack.clear();
      expect(stack.size).toBe(0);
      expect(stack.isEmpty).toBe(true);
      expect(() => stack.peek()).toThrowError(RangeError);
    });

    it('should remove all elements for stack with multiple elements', () => {
      const stack = Stack.fromArray([1, 2, 3, 4, 5, 6, 7]);
      stack.clear();
      expect(stack.size).toBe(0);
      expect(stack.isEmpty).toBe(true);
      expect(() => stack.peek()).toThrowError(RangeError);
    });

    describe('peek', () => {
      it('should throw RangeError if trying to peek an empty stack', () => {
        const stack = new Stack<number>();
        expect(() => stack.peek()).toThrowError(RangeError);
      });

      it('can peek top of stack - single element', () => {
        const stack = new Stack<number>(1);
        expect(stack.peek()).toBe(1);
        // Check stack same size
        expect(stack.size).toBe(1);
        expect(stack.isEmpty).toBe(false);
      });

      it('can peek top of stack - multiple elements', () => {
        const stack = Stack.fromArray([1, 2, 3]);
        expect(stack.peek()).toBe(3);
        // Check stack same size
        expect(stack.size).toBe(3);
        expect(stack.isEmpty).toBe(false);
      });
    });

    describe('Search stack', () => {
      it('should return false if element not found', () => {
        const stack = Stack.fromArray([1, 2, 3]);
        expect(stack.contains(4)).toBe(false);
      });

      it('should return true if element found - top of stack', () => {
        const stack = Stack.fromArray([1, 2]);
        expect(stack.contains(2)).toBe(true);
      });

      it('should return true if element found - middle of stack', () => {
        const stack = Stack.fromArray([1, 2, 3, 4]);
        expect(stack.contains(3)).toBe(true);
      });

      it('should return true if element found - bottom of stack', () => {
        const stack = Stack.fromArray([1, 2, 3, 4]);
        expect(stack.contains(4)).toBe(true);
      });
    });

    describe('Iterator', () => {
      it('can iterate with for...of', () => {
        const array = [1, 2, 3, 4];
        const stack = Stack.fromArray(array);
        expect(stack.size).toBe(4);

        let i = 0;
        for (const item of stack) {
          expect(item).toBe(array[i]);
          i++;
        }
      });

      it('can spread as an array', () => {
        const array = [1, 2, 3, 4];
        const stack = Stack.fromArray(array);
        expect(stack.size).toBe(4);
        expect([...stack]).toEqual([1, 2, 3, 4]);
      });
    });

    describe('To string', () => {
      it('should display stack like array - empty stack', () => {
        const stack = new Stack<number>();
        expect(stack.toString()).toBe('');
      });

      it('should display stack like array - numbers', () => {
        const stack = Stack.fromArray([1, 2, 3]);
        expect(stack.toString()).toBe('1,2,3');
      });

      it('should display stack like array - strings', () => {
        const stack = Stack.fromArray(['1', '2', '3']);
        expect(stack.toString()).toBe('1,2,3');
      });
    });
  });
});
