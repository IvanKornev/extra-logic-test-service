export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(value) {
    const newNode = new ListItem(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  toArray() {
    if (!this.head) {
      return [];
    }

    let result = [];
    let currentNode = this.head;
    while(currentNode !== null) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return result;
  }
}

class ListItem {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
