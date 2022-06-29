import { faker } from '@faker-js/faker';
import { addSelectOption } from '@domains';

export const generateSelectOptions = (count = 1) =>
  generateCollection(count, (collection) => {
    const newOption = {
      title: faker.word.noun(5),
    };
    collection.push(addSelectOption(newOption));
  });

export const generateFields = (count = 1) =>
  generateCollection(count, (collection) => {
    const newField = {
      name: faker.word.adverb(5),
      description: faker.word.adverb(5),
      type: 'text',
      isRequired: faker.datatype.boolean(),
    };
    collection.push(newField);
  });

const generateCollection = (count, collectionCallback) => {
  const collection = [];
  for (let i = 0; i < count; i += 1) {
    collectionCallback(collection);
  }
  if (collection.length === 1) {
    return collection[0];
  }
  return collection;
};
