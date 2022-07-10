import generateId from 'uniqid';
import { ListItem } from './list-item';

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insert(value) {
    const newNode = new ListItem(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return this;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    const lastNode = currentNode;
    newNode.previous = lastNode;
    lastNode.next = newNode;

    this.tail = newNode;
    this.length += 1;
    return this;
  }

  find(id) {
    let currentNode = this.head;
    let foundNode = null;
    let position = 1;
    while (currentNode) {
      if (currentNode.value.uniqueId === id) {
        foundNode = currentNode;
        break;
      }
      currentNode = currentNode.next;
      position += 1;
    }

    if (!foundNode) {
      position = null;
    }
    return {
      node: foundNode,
      position,
    };
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
    let copiedValue;
    while (!copiedValue) {
      if (currentNode.value.uniqueId !== id) {
        currentNode = currentNode.next;
      }
      if (currentNode.value.uniqueId === id) {
        copiedValue = JSON.parse(JSON.stringify(currentNode.value));
      }
    }

    const originalId = copiedValue.uniqueId;
    copiedValue.uniqueId = generateId();
    currentNode.next = new ListItem(copiedValue, currentNode.next, currentNode);

    if (this.tail.value.uniqueId === originalId) {
      this.tail = new ListItem(copiedValue, null, currentNode);
    }
    this.length += 1;
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
      if (this.head?.previous) {
        this.head.previous = null;
      }
    }

    let currentNode = this.head;
    while (currentNode?.next) {
      if (currentNode.next.value.uniqueId === id) {
        removedNode = currentNode.next;
        currentNode.next = currentNode.next.next;
        if (currentNode.next?.previous) {
          currentNode.next.previous = currentNode;
        }
      } else {
        currentNode = currentNode.next;
      }
    }

    if (this.tail.value.uniqueId === id) {
      removedNode = this.tail;
      this.tail = this.tail.previous;
    }

    this.length -= 1;
    return {
      list: this,
      removedNode,
    };
  }
}
