class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    const middle = Math.floor((start + end) / 2);
    const node = new Node(array[middle]);
    node.left = this.buildTree(array, start, middle - 1);
    node.right = this.buildTree(array, middle + 1, end);
    return node;
  }

  insert(value, node = this.root) {
    /* base case = if node has no value insert new node with value */
    if (node === null) {
      node = new Node(value);
      return node;
    }
    /* recursive loop = keep travelling down the tree until an empty node is found
    on the correct side (this will eventually be 'null' so the base case above
    will cause the function to return) */
    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, node = this.root) {
    /* base case */
    if (node === null) {
      return node;
    }
    /* The recusive element continues down the tree until the value is matched
    with a node */
    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      /* at this point the recursive element is finished and we have our targetted node.
      If that node only has one (or no) child we 'de-couple' it from the tree by replacing it
      with it's child node*/
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      /* if the node has 2 children the logic is slightly more complex */
      /* we find the the successor (lowest value in right subtree) and then assign
      our target node this value */
      let current = node.right;
      while (current.left !== null) {
        current = current.left;
      }
      node.value = current.value;
      /* Now that we have only 1 option, delete the right child value (we pass the value we
        have given our replacement node so that we can remove the duplicate*/
      node.right = this.delete(current.value, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    /* Base case (just return the node with the parameter value) */
    if (node.value === value) {
      return node;
    }
    /* keep travelling down the tree until base case is true */
    if (value < node.value) {
      return this.find(value, node.left);
    } else if (value > node.value) {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return null;
    }
    /* Nothing special here, just use a queue and while loop for a breadth first search. 
    as each 'level' of depth is added to the queue the previous level is removed */
    const queue = [this.root];
    const result = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (callback) callback(node);
      result.push(node);
    }
    return result;
  }

  /* for our Depth-first search's the only thing that needs to change between the
  3 is the order the data node is searched. preorder (node first), inorder(left, node, right)
  and postorder(node last) */
  preorder(callback, node = this.root, preorderList = []) {
    if (node === null) {
      return null;
    }
    callback ? callback(node) : preorderList.push(node.value);
    this.preorder(callback, node.left, preorderList);
    this.preorder(callback, node.right, preorderList);
    return preorderList;
  }

  inorder(callback, node = this.root, inorderList = []) {
    if (node === null) {
      return null;
    }
    this.preorder(callback, node.left, inorderList);
    callback ? callback(node) : inorderList.push(node.value);
    this.preorder(callback, node.right, inorderList);
    return inorderList;
  }

  postorder(callback, node = this.root, postorderList = []) {
    if (node === null) {
      return null;
    }
    this.preorder(callback, node.left, postorderList);
    this.preorder(callback, node.right, postorderList);
    callback ? callback(node) : postorderList.push(node.value);
    return postorderList;
  }

  /* Recursive way to find height = a DFS where 1 is added for each node travelled.
  the largest of the 2 routes will be returned*/
  height(node = this.root) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node, root = this.root, depth = 0) {
    if (node === root) {
      return 0;
    }
    if (root === null) {
      return -1;
    }
    if (node.value > root.value) {
      return this.depth(node, root.right, (depth += 1));
    } else {
      return this.depth(node, root.left, (depth += 1));
    }
  }

  /* We just use the height method we created earlier to compare the left/right sides
  of the node and return true if the sum is 1 or less */
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    const leftSideHeight = this.height(node.left);
    const rightSideHeight = this.height(node.right);
    return Math.abs(leftSideHeight - rightSideHeight) <= 1;
  }

  /* Super simple again here; an inorder list as an array is balanced (I quickly
    went back through my DFS methods so they each also return an array) */
  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

/* driver script */

const tree = new BinaryTree([
  10, 44, 66, 102, 1, 222, 34, 11, 8888, 2312, 14, 5,
]);
tree.prettyPrint();
tree.insert(6);
tree.prettyPrint();
tree.delete(222);
tree.prettyPrint();
console.log(tree.find(44));
console.log(tree.levelOrder());
console.log(tree.isBalanced());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
tree.insert(250);
tree.insert(260);
tree.insert(270);
tree.insert(280);
tree.prettyPrint();
console.log(tree.isBalanced()); /* false */
tree.rebalance();
console.log(tree.isBalanced()); /* true */
