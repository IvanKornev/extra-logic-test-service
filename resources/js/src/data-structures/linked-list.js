import generateId from 'uniqid';
import { ListItem } from './list-item';

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
    const lastNode = currentNode;
    lastNode.next = newNode;
    this.tail = newNode;
    return this;
  }

  find(id) {
    let currentNode = this.head;
    let foundNode = null;
    while (currentNode) {
      if (currentNode.value.uniqueId === id) {
        foundNode = currentNode;
        break;
      }
      currentNode = currentNode.next;
    }

    if (!foundNode) {
      return false;
    }
    return foundNode;
  }

  change(id, value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value.uniqueId === id) {
        currentNode.value = value;
        break;
      }
      currentNode = currentNode.next;
    }
    return this;
  }

  copy(id) {
    let currentNode = this.head;
    let copied = null;
    while (!copied) {
      if (currentNode.value.uniqueId !== id) {
        currentNode = currentNode.next;
      }
      if (currentNode.value.uniqueId === id) {
        copied = JSON.parse(JSON.stringify(currentNode));
      }
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

    let removedNode;
    while (this.head && this.head.value.uniqueId === id) {
      removedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.value.uniqueId === id) {
        removedNode = currentNode.next;
        currentNode.next = currentNode.next.next;
      } else {
        currentNode = currentNode.next;
      }
    }

    if (this.tail.value.uniqueId === id) {
      removedNode = this.tail;
      this.tail = currentNode;
    }
    
    return {
      list: this,
      removedNode,
    };
  }
}
