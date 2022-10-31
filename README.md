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

## Thoughts
Overall this was really useful practice to solidify my understanding of recursion. I spent absolutely ages on working out the solution to the `find` method. Solving the recursive element of the algorithm was pretty straightforward but it took me a while to work out the logic for removing a node with 2 children. 

A lot of the issues I had with working on these algorithms was that most of the articles I found online would just give you the pseudocode solution as part of the explanation. Once I understood the logic I never had much trouble writing out the Javascript version so I was a little unsure if this was the optimal way to learn. 

Either way I find solving these kind of puzzles extremely satisfying! There is a certain elegance in how optimised some of these algorithms are . I am concerned that I can't really see myself using these for web development very often though,  so I'll most likely forget the logic and have to return to this repo in the future (Hi, future self!)