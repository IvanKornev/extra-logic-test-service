import generateId from 'uniqid';

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

    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    let lastNode = currentNode;
    lastNode.next = newNode;
    this.tail = newNode;
    return this;
  }

  copy(id) {
    let currentNode = this.head;
    let copied = null;
    while(!copied) {
      if (currentNode.value.uniqueId !== id)
        currentNode = currentNode.next;
      if (currentNode.value.uniqueId === id)
        copied = JSON.parse(JSON.stringify(currentNode));
    }
    
    const originalId = copied.value.uniqueId;
    copied.value.uniqueId = generateId();
    if (this.tail.value.uniqueId === originalId) {
      this.tail = new ListItem(copied);
    }

    currentNode.next = copied;
    return {
      list: this,
      copiedValue: currentNode.next.value,
    };
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
