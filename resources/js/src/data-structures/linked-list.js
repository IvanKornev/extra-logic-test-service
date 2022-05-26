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

  remove(id) {
    if (!this.head) {
      return [];
    }
    while(this.head && this.head.value.uniqueId === id) {
      this.head = this.head.next;
    }

    let currentNode = this.head;
    while(currentNode.next) {
      (currentNode.next.value.uniqueId === id)
        ? currentNode.next = currentNode.next.next
        : currentNode = currentNode.next;
    }

    if (this.tail.value.uniqueId === id) {
      this.tail = currentNode;
    }
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
