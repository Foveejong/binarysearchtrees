class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = this.#sortedSet(arr);
        this.root = this.buildTree(this.arr);
    }

    #sortedSet(arr) {
        return [...new Set(arr)].sort((a, b) => {
            return a - b;
        });
    }

    #getSuccessor(root) {
        // obtain second biggest value to replace original node
        if (root.right !== null) root = root.right;
        while (root.left !== null) root = root.left;
        return root;
    }

    buildTree(arr) {
        let start = 0;
        let end = arr.length;
        let mid = Math.floor((start + end) / 2);

        if (start === end) return null;
        let root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(start, mid));
        root.right = this.buildTree(arr.slice(mid + 1, arr.length));

        return root;
    }

    insert(root, value) {
        // base case
        if (root === null) {
            this.arr.push(value);
            return new Node(value);
        }

        if (value === root.value) {
            console.log(`${value} is duplicated!`);
            return root;
        }

        if (value < root.value) {
            root.left = this.insert(root.left, value);
        } else {
            root.right = this.insert(root.right, value);
        }
        return root;
    }

    deleteItem(root, value) {
        // base case
        if (root === null) return root;

        // traverse tree to find node
        if (value < root.value) {
            root.left = this.deleteItem(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteItem(root.right, value);
        } else {
            // found the node
            this.arr.splice(this.arr.indexOf(value), 1);
            if (root.left === null && root.right === null) {
                // case 1: leaf node
                return null;
            } else if (root.left === null) {
                // case 2: one child
                return root.right;
            } else if (root.right === null) {
                // case 2: one child
                return root.left;
            } else {
                // case 3: 2 children
                let succ = this.#getSuccessor(root);
                root.value = succ.value;
                root.right = this.deleteItem(root.right, succ.value);
            }
        }
        return root;
    }

    find(root, value) {
        if (root === null) return 'node not in tree';

        if (value < root.value) {
            return this.find(root.left, value);
        } else if (value > root.value) {
            return this.find(root.right, value);
        } else {
            return root;
        }
    }

    levelorder(root, cb) {
        if (!cb) throw new Error('No callback function!');
        if (root === null) return;
        // if (root.right) this.levelorder(cb, root.right);
        // if (root.left) this.levelorder(cb, root.left);
        // cb(root.value);

        let queue = [root];
        while (queue.length > 0) {
            let item = queue.shift();
            cb(item.value);
            if (item.left !== null) queue.push(item.left);
            if (item.right !== null) queue.push(item.right);
        }
    }

    inOrder(root, cb, arr = []) {
        // if (!cb) throw new Error('No callback function!');
        if (root === null) return;

        if (root.left) this.inOrder(root.left, cb, arr);
        cb ? cb(root.value) : arr.push(root.value);
        if (root.right) this.inOrder(root.right, cb, arr);
        return arr;
    }

    preOrder(root, cb) {
        if (!cb) throw new Error('No callback function!');
        if (root === null) return;

        cb(root.value);
        if (root.left) this.preOrder(root.left, cb);
        if (root.right) this.preOrder(root.right, cb);
    }

    postOrder(root, cb) {
        if (!cb) throw new Error('No callback function!');
        if (root === null) return;

        if (root.left) this.postOrder(root.left, cb);
        if (root.right) this.postOrder(root.right, cb);
        cb(root.value);
    }

    height(root) {
        if (root === null) return 0;
        let left = 0,
            right = 0;
        if (root.left) {
            left = 1 + this.height(root.left);
        }
        if (root.right) {
            right = 1 + this.height(root.right);
        }
        return Math.max(left, right);

        // let height = 0;
        // let roots = [root];
        // while (roots.length > 0) {
        //     let nodeCount = roots.length;
        //     for (let i = 0; i < nodeCount; i++) {
        //         let item = roots.shift();
        //         if (item.right !== null) roots.push(item.right);
        //         if (item.left !== null) roots.push(item.left);
        //     }
        //     if (roots.length !== 0) height++;
        // }
        // return height;
    }

    depth(node, root) {
        if (node === null) return 'no such node';

        if (root.value < node.value && root.right != null) {
            return 1 + this.depth(node, root.right);
        } else if (root.value > node.value && root.left !== null) {
            return 1 + this.depth(node, root.left);
        } else {
            return 0;
        }
    }

    isBalanced() {
        if (
            Math.abs(
                this.height(this.root.left) - this.height(this.root.right)
            ) > 1
        ) {
            return false;
        }
        return true;
    }

    rebalance() {
        // provide sorted arr using inorder traversal of current root
        this.arr = this.inOrder(this.root);

        // provide new root
        this.root = this.buildTree(this.arr);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

export { Node, Tree, prettyPrint };
