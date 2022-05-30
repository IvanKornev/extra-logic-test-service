export class LinkedListConverter {
  static toArray(list) {
    if (!list.head) {
      return [];
    }
  
    const result = [];
    let currentNode = list.head;
    while (currentNode !== null) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return result;
  }
}
