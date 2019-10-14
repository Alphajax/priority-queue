class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority ;
		this.parent = null;
		this.left=null;
		this.right = null;
	}

	appendChild(node) {
		if(node.data >= this.data && this.right===null){
			this.right = node;
			node.parent = this;
		} else if (node.data < this.data && this.left===null){
			this.left = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node){
			this.left = null;
			node.parent = null;
		} else if(this.right === node){
			this.right = null;
			node.parent = null;
		} else{
			throw new Error();
		}
	}

	remove() {
		if(this.parent)  this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent) {
			let leftChild = this.left, rightChild = this.right;

			let  parent = this.parent, grandParent = this.parent.parent;
			if (grandParent){
				if (grandParent.left === parent){
					grandParent.left = this
				} else{
					grandParent.right = this
				}
			}
			this.parent = grandParent;

			if (parent.left === this) {
				this.left = parent;
				this.right = parent.right;
				if (this.right) this.right.parent = this;
			} else {
				this.right = parent;
				this.left = parent.left;
				if (this.left) this.left.parent = this;
			}
			parent.left = leftChild;
			parent.right = rightChild;
			parent.parent = this;

			if (leftChild) leftChild.parent = parent;
			if (rightChild) rightChild.parent = parent;
		}
	}
}

module.exports = Node;
