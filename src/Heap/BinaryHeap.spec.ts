import { describe, expect, it } from 'vitest';
import { BinaryHeap, Comparator } from './BinaryHeap';
import { faker } from '@faker-js/faker';

describe('Binary Heap', () => {
  function expectPoll(heap: BinaryHeap<number>, values: number[]) {
    for (const value of values) {
      expect(heap.peek()).toBe(value);
      expect(heap.poll()).toBe(value);
    }
  }
  function addToHeap(heap: BinaryHeap<number>, values: number[]) {
    for (const value of values) {
      heap.add(value);
    }
  }

  describe('Max-heap', () => {
    const maxComparator: Comparator<number> = (a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    };

    describe('Construction', () => {
      it('initial values create valid heap - single value', () => {
        const heap = new BinaryHeap<number>(maxComparator, [1]);
        expectPoll(heap, [1]);
      });

      it('initial values create valid heap - multiple values, priority order', () => {
        const heap = new BinaryHeap<number>(maxComparator, [5, 4, 3, 2, 1, 0]);
        expectPoll(heap, [5, 4, 3, 2, 1, 0]);
      });

      it('initial values create valid heap - single value, reverse priority order', () => {
        const heap = new BinaryHeap<number>(maxComparator, [0, 1, 2, 3, 4, 5]);
        expectPoll(heap, [5, 4, 3, 2, 1, 0]);
      });

      it('initial values create valid heap - single value, jumbled order', () => {
        const heap = new BinaryHeap<number>(maxComparator, [0, 2, 4, 3, 1, 5]);
        expectPoll(heap, [5, 4, 3, 2, 1, 0]);
      });
    });

    describe('Adding, peeking, and polling', () => {
      it('should be able to add, peek and poll a single element', () => {
        const heap = new BinaryHeap(maxComparator);
        heap.add(10);
        expect(heap.peek()).toBe(10);
      });

      it('should be able to add elements and peek highest', () => {
        const heap = new BinaryHeap(maxComparator);
        addToHeap(heap, [20, 10, 5]);
        expect(heap.peek()).toBe(20);
      });

      it('Should be able to add elements and poll highest priority', () => {
        const heap = new BinaryHeap(maxComparator);
        heap.add(10);
        heap.add(5);
        heap.add(20);

        expect(heap.peek()).toBe(20);

        expectPoll(heap, [20, 10, 5]);
      });

      it('should be able to add and poll - 100 elements, forward order', () => {
        const heap = new BinaryHeap(maxComparator);

        for (let i = 100; i >= 1; i--) {
          heap.add(i);
          expect(heap.peek()).toBe(100);
        }
        for (let i = 100; i >= 1; i--) {
          expect(heap.poll()).toBe(i);
        }
      });

      it('should be able to add and poll - 100 elements, reverse order', () => {
        const heap = new BinaryHeap(maxComparator);

        for (let i = 1; i <= 100; i++) {
          heap.add(i);
          expect(heap.peek()).toBe(i);
        }
        for (let i = 100; i >= 1; i--) {
          expect(heap.poll()).toBe(i);
        }
      });

      it('should handle falsy values correctly', () => {
        const heap = new BinaryHeap(maxComparator);
        addToHeap(heap, [5, 9, 0, 0]);
        expectPoll(heap, [9, 5, 0, 0]);
      });

      it('should return values correctly if all the same', () => {
        const heap = new BinaryHeap(maxComparator);
        addToHeap(heap, [10, 10, 10]);
        expectPoll(heap, [10, 10, 10]);
        expect(heap.size).toBe(0);
      });

      describe('Contains', () => {
        it('should return false if element not in list', () => {
          const heap = new BinaryHeap(maxComparator, [1, 2, 3, 4]);
          expect(heap.contains(404)).toBe(false);
        });

        it('should return true if element is at top of heap', () => {
          const heap = new BinaryHeap(maxComparator, [1, 2, 3, 4]);
          expect(heap.contains(4)).toBe(true);
        });

        it('should return true if element is at bottom of heap', () => {
          const heap = new BinaryHeap(maxComparator, [6, 5, 4, 3, 2, 1, 0]);
          expect(heap.contains(0)).toBe(true);
        });

        it('should return true if element is in middle of heap', () => {
          const heap = new BinaryHeap(maxComparator, [6, 5, 4, 3, 2, 1, 0]);
          expect(heap.contains(3)).toBe(true);
        });
      });

      describe('Removing elements', () => {
        it('should throw error if element does not exist', () => {
          const heap = new BinaryHeap(maxComparator, [1, 2, 3, 4]);
          expect(() => heap.remove(404)).toThrowError(RangeError);
        });

        it('should get and remove value and rebalance heap - top of heap', () => {
          const heap = new BinaryHeap(maxComparator, [1, 2, 3, 4]);
          expect(heap.remove(4)).toBe(4);
          expect(heap.size).toBe(3);
          expectPoll(heap, [3, 2, 1]);
          expect(heap.size).toBe(0);
        });

        it('should get and remove value and rebalance heap - bottom of heap', () => {
          const heap = new BinaryHeap(maxComparator, [1, 2, 3, 4]);
          expect(heap.remove(1)).toBe(1);
          expect(heap.size).toBe(3);
          expectPoll(heap, [4, 3, 2]);
          expect(heap.size).toBe(0);
        });
      });

      // Generate test cases of random lengths
      faker.seed(1000);

      const testInputs: number[][] = new Array(40).fill(null).map(() => {
        const size = faker.number.int({ min: 1, max: 100 });
        return new Array(size)
          .fill(null)
          .map(() => faker.number.int({ min: 0, max: 1000 }));
      });

      describe('Generated test cases', () => {
        testInputs.forEach((inputs, i) => {
          const expected = [...inputs].sort((a, b) => a - b).reverse();
          it(`Case ${i + 1}`, () => {
            const heap = new BinaryHeap(maxComparator);
            inputs.forEach((input) => heap.add(input));
            expected.forEach((ex, j) => {
              expect(heap.peek()).toBe(ex);
              expect(heap.poll()).toBe(ex);
              expect(heap.size).toBe(inputs.length - j - 1);
            });
          });
        });
      });
    });
  });

  describe('Min-heap', () => {
    const minComparator: Comparator<number> = (a, b) => {
      if (b > a) {
        return 1;
      } else if (b < a) {
        return -1;
      } else {
        return 0;
      }
    };

    describe('Construction', () => {
      it('initial values create valid heap - single value', () => {
        const heap = new BinaryHeap<number>(minComparator, [1]);
        expectPoll(heap, [1]);
      });

      it('initial values create valid heap - multiple values, priority order', () => {
        const heap = new BinaryHeap<number>(minComparator, [0, 1, 2, 3, 4, 5]);
        expectPoll(heap, [0, 1, 2, 3, 4, 5]);
      });

      it('initial values create valid heap - single value, reverse priority order', () => {
        const heap = new BinaryHeap<number>(minComparator, [5, 4, 3, 2, 1, 0]);
        expectPoll(heap, [0, 1, 2, 3, 4, 5]);
      });

      it('initial values create valid heap - single value, jumbled order', () => {
        const heap = new BinaryHeap<number>(minComparator, [0, 2, 4, 3, 1, 5]);
        expectPoll(heap, [0, 1, 2, 3, 4, 5]);
      });
    });

    describe('Adding, peeking, and polling', () => {
      it('should be able to add, peek and poll a single element', () => {
        const heap = new BinaryHeap(minComparator);
        heap.add(10);
        expect(heap.peek()).toBe(10);
      });

      it('should be able to add elements and peek lowest', () => {
        const heap = new BinaryHeap(minComparator);
        heap.add(10);
        heap.add(20);
        heap.add(5);
        expect(heap.peek()).toBe(5);
      });

      it('Should be able to add elements and poll highest priority', () => {
        const heap = new BinaryHeap(minComparator);
        heap.add(10);
        heap.add(5);
        heap.add(20);

        expect(heap.peek()).toBe(5);

        expect(heap.poll()).toBe(5);
        expect(heap.poll()).toBe(10);
        expect(heap.poll()).toBe(20);
      });

      it('should be able to add and poll - 100 elements, forward order', () => {
        const heap = new BinaryHeap(minComparator);

        for (let i = 1; i <= 100; i++) {
          heap.add(i);
          expect(heap.peek()).toBe(1);
        }
        for (let i = 1; i <= 100; i++) {
          expect(heap.poll()).toBe(i);
        }
      });

      it('should be able to add and poll - 100 elements, reverse order', () => {
        const heap = new BinaryHeap(minComparator);

        for (let i = 100; i >= 1; i--) {
          heap.add(i);
          expect(heap.peek()).toBe(i);
        }
        for (let i = 1; i <= 100; i++) {
          expect(heap.poll()).toBe(i);
        }
      });

      it('should handle falsy values correctly', () => {
        const heap = new BinaryHeap(minComparator);
        heap.add(5);
        heap.add(9);
        heap.add(0);
        heap.add(0);
        expect(heap.poll()).toBe(0);
        expect(heap.poll()).toBe(0);
        expect(heap.poll()).toBe(5);
        expect(heap.poll()).toBe(9);
      });

      it('should return values correctly if all the same', () => {
        const heap = new BinaryHeap(minComparator);
        heap.add(10);
        heap.add(10);
        heap.add(10);
        expect(heap.peek()).toBe(10);
        expect(heap.poll()).toBe(10);
        expect(heap.poll()).toBe(10);
        expect(heap.poll()).toBe(10);
      });

      describe('Contains', () => {
        it('should return false if element not in list', () => {
          const heap = new BinaryHeap(minComparator, [1, 2, 3, 4]);
          expect(heap.contains(404)).toBe(false);
        });

        it('should return true if element is at top of heap', () => {
          const heap = new BinaryHeap(minComparator, [1, 2, 3, 4]);
          expect(heap.contains(1)).toBe(true);
        });

        it('should return true if element is at bottom of heap', () => {
          const heap = new BinaryHeap(minComparator, [6, 5, 4, 3, 2, 1, 0]);
          expect(heap.contains(6)).toBe(true);
        });

        it('should return true if element is in middle of heap', () => {
          const heap = new BinaryHeap(minComparator, [6, 5, 4, 3, 2, 1, 0]);
          expect(heap.contains(3)).toBe(true);
        });
      });

      describe('Removing elements', () => {
        it('should throw error if element does not exist', () => {
          const heap = new BinaryHeap(minComparator, [1, 2, 3, 4]);
          expect(() => heap.remove(404)).toThrowError(RangeError);
        });

        it('should get and remove value and rebalance heap - top of heap', () => {
          const heap = new BinaryHeap(minComparator, [1, 2, 3, 4]);
          expect(heap.remove(1)).toBe(1);
          expect(heap.size).toBe(3);
          expectPoll(heap, [2, 3, 4]);
          expect(heap.size).toBe(0);
        });

        it('should get and remove value and rebalance heap - bottom of heap', () => {
          const heap = new BinaryHeap(minComparator, [1, 2, 3, 4]);
          expect(heap.remove(4)).toBe(4);
          expect(heap.size).toBe(3);
          expectPoll(heap, [1, 2, 3]);
          expect(heap.size).toBe(0);
        });
      });

      // Generate test cases of random lengths
      faker.seed(1000);

      const testInputs: number[][] = new Array(40).fill(null).map(() => {
        const size = faker.number.int({ min: 1, max: 100 });
        return new Array(size)
          .fill(null)
          .map(() => faker.number.int({ min: 0, max: 1000 }));
      });

      describe('Adding/polling Generated test cases', () => {
        testInputs.forEach((inputs, i) => {
          const expected = [...inputs].sort((a, b) => b - a).reverse();
          it(`Case ${i + 1}`, () => {
            const heap = new BinaryHeap(minComparator);
            inputs.forEach((input) => heap.add(input));
            expected.forEach((ex) => {
              expect(heap.peek()).toBe(ex);
              expect(heap.poll()).toBe(ex);
            });
          });
        });
      });
    });
  });
});
