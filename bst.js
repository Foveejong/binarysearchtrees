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
            return new Node(value);
        }

        if (value === root.value) {
            console.log('duplicate!');
            return;
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

const t1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
t1.insert(t1.root, 10);
t1.insert(t1.root, 11);
t1.deleteItem(t1.root, 8);
prettyPrint(t1.root);
