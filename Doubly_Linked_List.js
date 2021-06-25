const { DllPlugin } = require("webpack");

class DoublyLinkedListNode {
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor(data) {
        this.head = {
            data: data,
            next: null,
            prev: null
        }
        this.tail = this.head;
        this.length = 1;
    }
    appendNode(data){
        let newNode = new DoublyLinkedListNode(data);
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.length++;
    }
    getProps(){
        if(this.length === 1){
            return `The List contains only one Node: ${this.head.data}`;
        }
        return ` || Length: ${this.length}\n || Head: ${this.head.data}\n || Tail: ${this.tail.data}`
    }
    prependNode(data){
        let newNode = new DoublyLinkedListNode(data);
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length++;
    }
    traverse(index){
        let counter = 0;
        let currentNode = this.head;
        while(counter !== index){
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }
    removeHead(){
        let currentHead = this.head;
        let newHead = currentHead.next;
        currentHead.next = null;
        newHead.prev = null;
        this.head = newHead;
        this.length--;
    }
    removeTail(){
        let tail = this.tail;
        this.tail = tail.prev;
        this.tail.next = null;
        this.length--;  
    }
    removeNode(index){
        if(index == 0){
            return this.removeHead();
        }
        if(index >= this.length){
            return this.removeTail();
        }
        let leaderNode = this.traverse(index - 1);
        let nodeToRemove = leaderNode.next;
        let followerNode = nodeToRemove.next;
        leaderNode.next = followerNode;
        followerNode.prev = leaderNode;
        this.length--;
    }
    replaceNode(index, data){
        let nodeToReplace = this.traverse(index);
        nodeToReplace.data = data;
        return this.printList();
    }
    printList(){
        let array = [];
        let currentNode = this.head;
        while(currentNode !== null){
            array.push(currentNode.data)
            currentNode = currentNode.next;
        }
        return array;
    }
    insertNode(index, data){
        if(index === 0){
            return this.prependNode(data);
        }
        if(index >= this.length){
            return this.appendNode(data);
        }
        let newNode = new DoublyLinkedListNode(data);
        let leader = this.traverse(index - 1);
        let followerNode = leader.next;
        leader.next = newNode;
        newNode.prev = leader;
        newNode.next = followerNode;
        followerNode.prev = newNode;
        this.length++;
    }
}

