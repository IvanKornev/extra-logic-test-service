import generateId from 'uniqid';
import lodash from 'lodash';
import * as Yup from 'yup';

export const optionValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(16, 'Название опции - не дольше 16 символов')
    .min(2, 'Название опции - не меньше 2 символов')
    .required('Название опции - обязательно'),
  value: Yup.string()
    .max(19, 'Значение опции - не дольше 19 символов')
    .min(2, 'Значение опции - не меньше 2 символов')
    .required('Значение опции - обязательно'),
});

export const addSelectOption = (option) => {
  const id = generateId();
  const { title, value } = option;
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

export const getSelectOptionTexts = (option, number) => {
  const { title, value } = option;
  const texts = {
    primary: `${number}) ${title}`,
    secondary: value,
  };
  return texts;
};

export const selectOptionIsEmpty = (option) =>
  !!(!option.title || !option.value);
