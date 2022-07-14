import { faker } from '@faker-js/faker';

export const fillDoublyLinkedList = (uniqueId, list) => {
  for (let i = 0; i <= 10; i += 1) {
    if (i === 5) {
      list.insert({ uniqueId });
    }
    list.insert(faker.datatype.uuid());
  }
};
