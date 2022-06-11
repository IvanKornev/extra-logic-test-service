import generateId from 'uniqid';

export const addSelectOption = (option) => {
  const id = generateId();
  const { title, value } = option;
  return { id, title, value };
};

export const editSelectOption = (values, options) => (
  options.map((option) => {
    if (option.id === values.id) {
      return values;
    }
  return option;
  })
);

export const removeSelectOption = (id, options) => (
  options.filter((option) => option.id !== id)
);

export const getSelectOptionTexts = (option, number = 1) => {
  const { title, value } = option;
  const texts = {
    primary: `${number}) Наименование: ${title}`,
    secondary: `Значение: ${value}`,
  };
  return texts;
};

export const selectOptionIsEmpty = (option) => !!(!option.title || !option.value);
