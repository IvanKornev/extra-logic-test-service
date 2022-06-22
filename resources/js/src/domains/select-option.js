import generateId from 'uniqid';
import lodash from 'lodash';

export const addSelectOption = (option) => {
  const id = generateId();
  const { title, value } = option;
  return { id, title, value };
};

export const editSelectOption = (values, options) => options.map((option) => {
  if (option.id === values.id) {
    return values;
  }
  return option;
});

export const removeSelectOption = (id, options) => options.filter((option) => option.id !== id);

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

export const getSelectOptionTexts = (option, number = 1) => {
  const { title, value } = option;
  const texts = {
    primary: `${number}) Имя: ${title}`,
    secondary: `Значение: ${value}`,
  };

  Object.keys(texts).map((text) => {
    if (texts[text].length > 20) {
      texts[text] = `${texts[text].substring(0, 19)}...`;
    }
    return texts[text];
  });
  return texts;
};

export const selectOptionIsEmpty = (option) => !!(!option.title || !option.value);
