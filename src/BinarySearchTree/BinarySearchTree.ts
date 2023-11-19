import { Queue } from '../Queue/Queue';
import { Stack } from '../Stack/Stack';
import { Comparator } from '../util/comparable';
import { Maybe } from '../util/helper.types';

class BinarySearchNode<T> {
  public constructor(
    public value: T,
    public left: Maybe<BinarySearchNode<T>>,
    public right: Maybe<BinarySearchNode<T>>,
  ) {}
}

/**
 * Binary search tree data structure.
 * For each node `N`
 * - All elements in the **left** child sub-tree are **<=** `N`
 * - All elements in the **right** child sub-tree are **>=** `N`
 *
 * ### Complexity
 * | Operation | Average    | Worst |
 * |-----------|------------|-------|
 * | Insert    | O(log(n))  | O(n)  |
 * | Delete	   | O(log(n))  | O(n)  |
 * | Remove	   | O(log(n))  | O(n)  |
 * | Search	   | O(log(n))  | O(n)  |
 */
export class BinarySearchTree<T> {
  private _root: Maybe<BinarySearchNode<T>> = null;
  private _size = 0;

  /**
   * @param comparator a comparator function taking two BST elements. Should return:
   * - `0` if values are equal
   * - `1` if the 1st element is **larger** than the 2nd
   * - `-1` if the 1st element is **smaller** than the 2nd
   * @param items initial values to be added to the tree
   */
  public constructor(
    private comparator: Comparator<T>,
    elements: T[] = [],
  ) {
    for (const el of elements) {
      this.add(el);
    }
  }

  public get size() {
    return this._size;
  }

  public get isEmpty() {
    return this.size === 0;
  }

  /**
   * Add an element to the tree.
   * @NOTE duplicate elements will not be added and will not throw an error either
   * @param element to add
   */
  public add(element: T): void {
    if (!this._root) {
      this._root = new BinarySearchNode(element, null, null);
      this._size++;
    } else {
      const added = this.addUnderSubtree(element, this._root);
      if (added) {
        this._size++;
      }
    }
  }

  /**
   * Find an element in the tree
   * @returns the element node or null if the element not found
   * @param element
   */
  public find(element: T): Maybe<BinarySearchNode<T>> {
    if (!this._root) {
      return null;
    }

    const { node } = this.findUnderSubtree(element, this._root, null);
    return node;
  }

  /**
   * Remove an element from the tree
   * @param element
   * @throws RangeError if element not found in tree
   */
  public remove(element: T): T {
    if (!this._root) {
      throw new RangeError('Element not found');
    }

    // 1. Find node to remove
    const { node: toRemove, parent } = this.findUnderSubtree(
      element,
      this._root,
      null,
    );

    if (!toRemove) {
      throw new RangeError('Element not found');
    }

    // 2. Remove node
    const parentSide =
      parent?.left && this.comparator(toRemove.value, parent.left.value) === 0
        ? 'left'
        : 'right';

    // 2a. If leaf
    if (this.isLeaf(toRemove)) {
      if (parent) {
        parent[parentSide] = null;
      } else {
        this._root = null;
      }
    }
    // 2b. Only right subtree
    if (toRemove.right && !toRemove.left) {
      if (parent) {
        parent[parentSide] = toRemove.right;
      } else {
        this._root = toRemove.right;
      }
    }
    // 2c. Only left subtree
    if (toRemove.left && !toRemove.right) {
      if (parent) {
        parent[parentSide] = toRemove.left;
      } else {
        this._root = toRemove.left;
      }
    }
    // 2d. Both sub trees
    if (toRemove.left && toRemove.right) {
      // find min value in right subtree
      const { node: successor, parent: successorParent } = this.findMinInTree(
        toRemove.right,
        toRemove,
      );
      // Replace value of node to remove with successor
      toRemove.value = successor.value;
      // Replace successor node with only child (in our case will always be right child)
      // as findMinInTree goes as far left as possible
      // i. Handle case where successor is the exact right-side child of node to remove
      if (successor === toRemove.right) {
        toRemove.right = successor.right;
      } else {
        // ii. Otherwise successor is (was) the left child of its parent
        successorParent.left = successor.right;
      }
    }

    // Return removed node
    this._size--;
    return element;
  }

  //====================//
  //     Traversals     //
  //====================//

  /**
   * Returns a traversal iterator to access tree values in a pre-order:
   * visiting nodes top-down, left to right
   */
  public traversePreOrder(): IterableIterator<T> {
    const tree = this;

    class TraversePreOrderIterator implements IterableIterator<T> {
      private stack = new Stack<BinarySearchNode<T>>();
      private get isDone() {
        return tree._root === null || this.stack.isEmpty;
      }

      public constructor() {
        if (tree._root) {
          this.stack.push(tree._root);
        }
      }

      public next() {
        if (this.isDone) {
          return { done: true, value: undefined as T };
        }
        const node = this.stack.pop();
        if (node.right !== null) this.stack.push(node.right);
        if (node.left !== null) this.stack.push(node.left);
        return {
          done: false,
          value: node.value,
        };
      }

      [Symbol.iterator]() {
        return this;
      }
    }

    return new TraversePreOrderIterator();
  }

  /**
   * Returns a traversal iterator to access tree values in-order:
   * Returns nodes in ascending value order
   */
  public traverseInOrder(): IterableIterator<T> {
    const tree = this;

    class TraverseInOrderIterator implements IterableIterator<T> {
      private stack = new Stack<BinarySearchNode<T>>();
      private trav = tree._root;
      private get isDone() {
        return tree._root === null || this.stack.isEmpty;
      }

      public constructor() {
        if (tree._root) {
          this.stack.push(tree._root);
        }
      }

      public next() {
        if (this.isDone) {
          return { done: true, value: undefined as T };
        }

        // Dig left
        while (this.trav !== null && this.trav.left !== null) {
          this.stack.push(this.trav.left);
          this.trav = this.trav.left;
        }

        const node = this.stack.pop();

        // Try moving down right once
        if (node.right !== null) {
          this.stack.push(node.right);
          this.trav = node.right;
        }

        return {
          done: false,
          value: node.value,
        };
      }

      [Symbol.iterator]() {
        return this;
      }
    }

    return new TraverseInOrderIterator();
  }

  /**
   * Returns a traversal iterator to access tree values in a post-order:
   * Traverse the left subtree, then the right subtree, then print the value
   * of the node (left to right, children first)
   */
  public traversePostOrder(): IterableIterator<T> {
    const tree = this;

    class TraversePostOrderIterator implements IterableIterator<T> {
      private stack1 = new Stack<BinarySearchNode<T>>();
      private stack2 = new Stack<BinarySearchNode<T>>();

      private get isDone() {
        return tree._root === null || this.stack2.isEmpty;
      }

      public constructor() {
        if (tree._root) {
          this.stack1.push(tree._root);
        }

        while (!this.stack1.isEmpty) {
          const node = this.stack1.pop();
          if (node !== null) {
            this.stack2.push(node);
            if (node.left !== null) this.stack1.push(node.left);
            if (node.right !== null) this.stack1.push(node.right);
          }
        }
      }

      public next() {
        if (this.isDone) {
          return { done: true, value: undefined as T };
        }

        const node = this.stack2.pop();

        return {
          done: false,
          value: node.value,
        };
      }

      [Symbol.iterator]() {
        return this;
      }
    }

    return new TraversePostOrderIterator();
  }

  /**
   * Returns a traversal iterator to access tree values in a level-order,
   * a **breadth first search**.
   * Traverse each node level by level, starting with root node (level 0),
   * then level 1 - left to right, etc.
   */
  public traverseLevelOrder(): IterableIterator<T> {
    const tree = this;

    class TraverseLevelOrderIterator implements IterableIterator<T> {
      private queue = new Queue<BinarySearchNode<T>>();

      private get isDone() {
        return tree._root === null || this.queue.isEmpty;
      }

      public constructor() {
        if (tree._root) {
          this.queue.enqueue(tree._root);
        }
      }

      public next() {
        if (this.isDone) {
          return { done: true, value: undefined as T };
        }

        const node = this.queue.dequeue();
        if (node.left !== null) this.queue.enqueue(node.left);
        if (node.right !== null) this.queue.enqueue(node.right);

        return {
          done: false,
          value: node.value,
        };
      }

      [Symbol.iterator]() {
        return this;
      }
    }

    return new TraverseLevelOrderIterator();
  }

  //========================//
  //     Private methods    //
  //========================//

  private findMinInTree(
    root: BinarySearchNode<T>,
    parent: BinarySearchNode<T>,
  ): FindMinNodeResult<T> {
    while (root.left) {
      root = root.left;
      parent = root;
    }

    return { node: root, parent };
  }

  private isLeaf(node: BinarySearchNode<T>) {
    return !node.left && !node.right;
  }

  private findUnderSubtree(
    element: T,
    root: BinarySearchNode<T>,
    parent: Maybe<BinarySearchNode<T>>,
  ): FindNodeResult<T> {
    const compareResult = this.comparator(element, root.value);

    if (compareResult === 0) {
      // 1. Node found - same value
      return { node: root, parent };
    }
    if (compareResult === 1) {
      // 2. Element > root
      if (root.right) {
        return this.findUnderSubtree(element, root.right, root);
      }
    }
    if (compareResult === -1) {
      // 3. Element < root
      if (root.left) {
        return this.findUnderSubtree(element, root.left, root);
      }
    }
    // 4. Node not found
    return { node: null, parent: null };
  }

  private addUnderSubtree(
    element: T,
    root: BinarySearchNode<T>,
  ): Maybe<BinarySearchNode<T>> {
    const compareResult = this.comparator(element, root.value);

    if (compareResult === 1) {
      // New element larger than subtree root
      if (root.right) {
        return this.addUnderSubtree(element, root.right);
      } else {
        root.right = new BinarySearchNode(element, null, null);
        return root.right;
      }
    } else if (compareResult === -1) {
      // New element smaller than subtree root
      if (root.left) {
        return this.addUnderSubtree(element, root.left);
      } else {
        root.left = new BinarySearchNode(element, null, null);
        return root.left;
      }
    } else {
      // If duplicate (comparator returned 0, meaning elements matched), do nothing
      return null;
    }
  }
}

interface FindNodeResult<T> {
  node: Maybe<BinarySearchNode<T>>;
  parent: Maybe<BinarySearchNode<T>>;
}

interface FindMinNodeResult<T> {
  node: BinarySearchNode<T>;
  parent: BinarySearchNode<T>;
}
