# Binary-Search-Tree

The goal here was to create a balanced binary search tree in Javascript with the following functions;

- `buildTree(array)` takes an array of data and turns it into a balanced binary tree full of `Node` objects
- `prettyprint()` will `console.log` the tree in a structured format
- `insert(value)` & `delete(value)` insert or remove the node containing the given value
- `find(value)` finds the node containing the given value
- `levelOrder(callback)` performs a breadth-first search and provide each node as the argument to the provided function
- `preorder(callback)`, `inorder(callback)` & `postorder(callback)` perform a depth-first search (DLR, LDR & LRD) and yield each node to the provided function as an argument
- `height(node)` accepts a node and returns it's height (the number of edges in the longest path between the node and a leaf node)
- `depth(node)` accepts a node and returns it's height (the number of edges in the longest path between the node and the tree's root node)
- `isBalanced()` checks if the tree is balanced (the height of the every node on the left/right subtrees must be no more than 1)
- `rebalance()` rebalances an unbalanced tree