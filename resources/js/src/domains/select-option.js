import generateId from 'uniqid';
import { generateString } from '@lib/generators';
import lodash from 'lodash';

export const addSelectOption = (option) => {
  const id = generateId();
  const value = generateString();
  const { title } = option;
  return { id, title, value };
};

export const editSelectOption = (values, options) =>
  options.map((option) => {
    if (option.id === values.id) {
      return values;
    }
    return option;
  });

export const removeSelectOption = (id, options) =>
  options.filter((option) => option.id !== id);

export const compareOptionLists = (initialList, updatedList) => {
  let wasUpdated = false;
  if (initialList.length > 0) {
    const initialValues = initialList.map(({ id, ...attrs }) => attrs);
    const updatedValues = updatedList.map(({ id, ...attrs }) => attrs);
    if (lodash.isEqual(initialValues, updatedValues)) {
      wasUpdated = false;
    } else {
      wasUpdated = true;
    }
  }
  return wasUpdated;
};

export const selectOptionIsEmpty = (option) =>
  !!(!option.title || !option.value);

export const getSelectOptionClasses = (cssModule) => {
  const classes = [
    'options-list__option_default',
    cssModule['option_default']
  ];
  return classes
};
