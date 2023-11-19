import { describe, expect, it } from 'vitest';
import { BinarySearchTree } from './BinarySearchTree';
import { Comparator } from '../util/comparable';

const maxComparator: Comparator<number> = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
};

function addToTree(tree: BinarySearchTree<number>, items: number[]) {
  for (const item of items) {
    tree.add(item);
  }
}

describe('Binary Search Tree', () => {
  /**
   * @see ./balanced-tree.png
   */
  const balancedTree = () => {
    const tree = new BinarySearchTree<number>(maxComparator);
    addToTree(
      tree,
      [
        // Root
        7,
        // Left side
        5, 4, 2, 1, 3,
        // Right side
        20, 18, 11, 14, 12, 15, 19, 25, 33, 28, 31,
      ],
    );
    return tree;
  };
  /**
   * @see ./one-sided-tree.png
   */
  const oneSidedTree = () => {
    const tree = new BinarySearchTree<number>(maxComparator);
    addToTree(tree, [80, 4, 2, -1, 0, 14, 6, 9, 8, 13, 12, 15, 16]);
    return tree;
  };
  /**
   * @see ./line-tree.png
   */
  const lineTree = () => {
    const tree = new BinarySearchTree<number>(maxComparator);
    addToTree(tree, [1, 2, 20, 19, 3, 4, 18, 17, 5]);
    return tree;
  };
  /**
   * @see ./small-tree.png
   */
  const smallTree = () => {
    const tree = new BinarySearchTree<number>(maxComparator);
    addToTree(tree, [0, -2, -4, -1, 2, 3]);
    return tree;
  };

  describe('Adding elements', () => {
    it('Can add and find some elements - balanced', () => {
      const tree = balancedTree();
      // Find root
      expect(tree.find(7)).toBeTruthy();
      // Find leaf (min)
      expect(tree.find(1)).toBeTruthy();
      // Find leaf (max)
      expect(tree.find(31)).toBeTruthy();
      // Find element in the middle
      expect(tree.find(18)).toBeTruthy();
      // Check false positive
      expect(tree.find(100)).toBeNull();
      expect(tree.size).toBe(17);
    });

    it('adding an existing node does nothing', () => {
      const tree = new BinarySearchTree<number>(maxComparator);
      addToTree(tree, [1, 0, 3, 4]);
      expect(tree.size).toBe(4);
      tree.add(1);
      expect(tree.size).toBe(4);
      tree.add(0);
      expect(tree.size).toBe(4);
      tree.add(3);
      expect(tree.size).toBe(4);
      tree.add(4);
      expect(tree.size).toBe(4);
      tree.add(10);
      expect(tree.size).toBe(5);
    });
  });

  describe('Remove elements', () => {
    // Balanced tree
    it('Can remove element - remove root from balanced tree', () => {
      const tree = balancedTree();
      expect(tree.find(7)).toBeTruthy();
      expect(tree.remove(7)).toBe(7);
      // Checks
      expect(tree.find(7)).toBeNull();
      expect(tree.find(11)).toBeTruthy();
      expect(tree.size).toBe(16);
    });

    it('Can remove element - remove leaf from balanced tree', () => {
      const tree = balancedTree();
      expect(tree.find(3)).toBeTruthy();
      expect(tree.remove(3)).toBe(3);
      // Checks
      expect(tree.find(3)).toBeNull();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.size).toBe(16);
    });

    it('Can remove element - remove leaf in middle from balanced tree', () => {
      const tree = balancedTree();
      expect(tree.find(25)).toBeTruthy();
      expect(tree.remove(25)).toBe(25);
      // Checks
      expect(tree.find(25)).toBeNull();
      expect(tree.find(20)).toBeTruthy();
      expect(tree.find(33)).toBeTruthy();
      expect(tree.find(28)).toBeTruthy();
      expect(tree.find(31)).toBeTruthy();
      expect(tree.size).toBe(16);
    });

    // One-sided tree
    it('Can remove element - remove root from one-sided tree', () => {
      const tree = oneSidedTree();
      expect(tree.find(80)).toBeTruthy();
      expect(tree.remove(80)).toBe(80);
      // Checks
      expect(tree.find(80)).toBeNull();
      expect(tree.find(4)).toBeTruthy();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.find(14)).toBeTruthy();
      expect(tree.size).toBe(12);
    });

    it('Can remove element - remove leaf from one-sided tree', () => {
      const tree = oneSidedTree();
      expect(tree.find(12)).toBeTruthy();
      expect(tree.remove(12)).toBe(12);
      // Checks
      expect(tree.find(12)).toBeNull();
      expect(tree.find(13)).toBeTruthy();
      expect(tree.size).toBe(12);
    });

    it('Can remove element - remove leaf in middle from one-sided tree', () => {
      const tree = oneSidedTree();
      expect(tree.find(9)).toBeTruthy();
      expect(tree.remove(9)).toBe(9);
      // Checks
      expect(tree.find(9)).toBeNull();
      expect(tree.find(8)).toBeTruthy();
      expect(tree.find(13)).toBeTruthy();
      expect(tree.find(12)).toBeTruthy();
      expect(tree.find(6)).toBeTruthy();
      expect(tree.size).toBe(12);
    });

    // Line tree (all nodes have one child, except single leaf)
    it('Can remove element - remove root from line tree', () => {
      const tree = lineTree();
      expect(tree.find(1)).toBeTruthy();
      expect(tree.remove(1)).toBe(1);
      // Checks
      expect(tree.find(1)).toBeNull();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.find(3)).toBeTruthy();
      expect(tree.find(5)).toBeTruthy();
      expect(tree.size).toBe(8);
    });

    it('Can remove element - remove leaf from line tree', () => {
      const tree = lineTree();
      expect(tree.find(5)).toBeTruthy();
      expect(tree.remove(5)).toBe(5);
      // Checks
      expect(tree.find(5)).toBeNull();
      expect(tree.find(17)).toBeTruthy();
      expect(tree.find(1)).toBeTruthy();
      expect(tree.size).toBe(8);
    });

    it('Can remove element - remove leaf in middle from line tree', () => {
      const tree = lineTree();
      expect(tree.find(19)).toBeTruthy();
      expect(tree.remove(19)).toBe(19);
      // Checks
      expect(tree.find(19)).toBeNull();
      expect(tree.find(3)).toBeTruthy();
      expect(tree.find(5)).toBeTruthy();
      expect(tree.find(1)).toBeTruthy();
      expect(tree.find(20)).toBeTruthy();
      expect(tree.size).toBe(8);
    });

    // Small tree
    it('Can remove element - remove root from small tree', () => {
      const tree = smallTree();
      expect(tree.find(0)).toBeTruthy();
      expect(tree.remove(0)).toBe(0);
      // Checks
      expect(tree.find(0)).toBeNull();
      expect(tree.find(-2)).toBeTruthy();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.find(-4)).toBeTruthy();
      expect(tree.find(3)).toBeTruthy();
      expect(tree.size).toBe(5);
    });

    it('Can remove element - remove leaf from small tree', () => {
      const tree = smallTree();
      expect(tree.find(-4)).toBeTruthy();
      expect(tree.remove(-4)).toBe(-4);
      // Checks
      expect(tree.find(-4)).toBeNull();
      expect(tree.find(-2)).toBeTruthy();
      expect(tree.find(0)).toBeTruthy();
      expect(tree.size).toBe(5);
    });

    it('Can remove element - remove leaf in middle from small tree', () => {
      const tree = smallTree();
      expect(tree.find(2)).toBeTruthy();
      expect(tree.remove(2)).toBe(2);
      // Checks
      expect(tree.find(2)).toBeNull();
      expect(tree.find(3)).toBeTruthy();
      expect(tree.find(0)).toBeTruthy();
      expect(tree.find(-2)).toBeTruthy();
      expect(tree.find(-4)).toBeTruthy();
      expect(tree.size).toBe(5);
    });
  });

  describe('Tree traversals', () => {
    describe('Pre-order traversal', () => {
      it('should return elements in right order - small tree', () => {
        const tree = smallTree();
        const expected: number[] = [0, -2, -4, -1, 2, 3];
        expect([...tree.traversePreOrder()]).toEqual(expected);
      });
    });

    describe('In-order traversal', () => {
      it('should return elements in right order - small tree', () => {
        const tree = smallTree();
        const expected: number[] = [-4, -2, -1, 0, 2, 3];
        expect([...tree.traverseInOrder()]).toEqual(expected);
      });
    });

    describe('Post-order traversal', () => {
      it('should return elements in right order - small tree', () => {
        const tree = smallTree();
        const expected: number[] = [-4, -1, -2, 3, 2, 0];
        expect([...tree.traversePostOrder()]).toEqual(expected);
      });
    });

    describe('Level-order traversal', () => {
      it('should return elements in right order - small tree', () => {
        const tree = smallTree();
        const expected: number[] = [0, -2, 2, -4, -1, 3];
        expect([...tree.traverseLevelOrder()]).toEqual(expected);
      });
    });
  });
});
