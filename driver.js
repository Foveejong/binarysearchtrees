import { Node, Tree, prettyPrint } from './bst.mjs';

const t1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// t1.inOrder(t1.root, console.log);
// t1.levelorder(t1.root, console.log);
// t1.preOrder(t1.root, console.log);
// t1.postOrder(t1.root, console.log);
t1.deleteItem(t1.root, 3);
t1.deleteItem(t1.root, 3);

// console.log(t1.isBalanced());
// t1.insert(t1.root, 10);
// t1.insert(t1.root, 11);
// t1.insert(t1.root, 11);
// prettyPrint(t1.root);
// console.log(t1.isBalanced());

// t1.insert(t1.root, 30);
// t1.insert(t1.root, 29);
// t1.insert(t1.root, 25);
// t1.insert(t1.root, 27);
// t1.rebalance();
// prettyPrint(t1.root);
// console.log(t1.isBalanced());
