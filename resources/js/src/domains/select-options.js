import { UilTrashAlt, UilPen } from '@iconscout/react-unicons';
import { MenuItem } from '@mui/material';
import generateId from 'uniqid';

const values = {
  title: '',
  value: '',
};

const labels = {
  title: 'Наименование',
  value: 'Значение',
};

const render = (component) =>
  component.options.map((option) => (
    <MenuItem key={generateId()} value={option.value}>
      {option.title}
    </MenuItem>
  ));

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

const edit = (id, options) => {
  const title = prompt('Какое будет наименование у опции?', 'имя');
  const value = prompt('А значение?', 'значение');
  return options.map((option) => {
    if (option.id === id) {
      const updatedOption = { id, title, value };
      return updatedOption;
    }
    return option;
  });
};

const remove = (id, options) => options.filter((option) => option.id !== id);

const getActions = (callbacks) => {
  if (!callbacks) {
    return false;
  }
  const actions = [
    { iconComponent: UilPen, performAction: callbacks.edit },
    { iconComponent: UilTrashAlt, performAction: callbacks.remove },
  ];
  return actions;
};

export const selectOptions = {
  values,
  labels,
  render,
  getTexts,
  add,
  edit,
  remove,
  getActions,
};
