const fs = require("fs");

class Node {
    constructor(char, left = null, right = null) {
        this.char = char;
        this.left = left;
        this.right = right;
    }
}

function convRecurs(unstructuredchars, curstring) {
    for (let char of unstructuredchars) {
        if (curstring === char[1]) {
            return new Node(char[0]);
        }
    }
    let node1 = convRecurs(unstructuredchars, curstring + "0");
    let node2 = convRecurs(unstructuredchars, curstring + "1");
    return new Node(null, node1, node2);
}

function returnEncoding(node, curstring, target) {
    if (node.char === target) {
        return curstring;
    }
    let l = node.left ? returnEncoding(node.left, curstring + "0", target) : null;
    let r = node.right ? returnEncoding(node.right, curstring + "1", target) : null;
    return l || r || null;
}

function encodePw(pw) {
    let hammingcode = 0;
    for (let ch of pw) {
        let encoding = returnEncoding(root, "", ch);
        if (encoding) {
            hammingcode += encoding.length;
        }
    }
    console.log(hammingcode);
}

fs.readFile("hamming codes.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    
    let unstructuredchars = data.split("\n").map(line => [line[0], line.slice(2).trim()]);
    root = convRecurs(unstructuredchars, "");
    
    // Example password input
    let password = "yourpasswordhere"; 
    encodePw(password);
});
