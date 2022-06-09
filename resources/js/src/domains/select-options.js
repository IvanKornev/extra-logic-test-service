import { UilTrashAlt, UilPen } from '@iconscout/react-unicons';
import generateId from 'uniqid';

const getTexts = (option, number = 1) => {
  const { title, value } = option;
  const texts = {
    primary: `${number}) Наименование: ${title}`,
    secondary: `Значение: ${value}`,
  };
  return texts;
};

const add = (option) => {
  const id = generateId();
  const { title, value } = option;
  return { id, title, value };
};

const edit = (values, options) => (
  options.map((option) => {
    if (option.id === values.id) {
      return values;
    }
    return option;
  })
)

const remove = (id, options) => options.filter((option) => option.id !== id);

const getActions = (callbacks) => {
  const actions = [
    { iconComponent: UilPen, callback: callbacks.edit },
    { iconComponent: UilTrashAlt, callback: callbacks.remove },
  ];
  return actions;
};

export const selectOptions = {
  getTexts,
  add,
  edit,
  remove,
  getActions,
};
