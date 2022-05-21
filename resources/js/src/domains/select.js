import { Select, MenuItem } from '@mui/material';
import generateId from 'uniqid';

const renderOptions = component => (
  component.options.map((option) => (
    <MenuItem key={ generateId() } value={ option.value }>
      { option.title }
    </MenuItem>
)));

const getOptionTexts = (option, number = 1) => {
  const { title, value } = option;
  const texts = {
    primary: `${ number }) Наименование: ${ title }`,
    secondary: `Значение: ${ value }`,
  };
  return texts;
};

const addOption = values => {
  const id = generateId();
  const { title, value } = values;
  return { id, title, value };
};

const editOption = (id = 1, options) => {
  const title = prompt('Какое будет наименование у опции?', 'имя');
  const value = prompt('А значение?', 'значение');
  return options.map((option) => {
    if (option.id === id) {
      option = { id, title, value };
    }
    return option;
  });
};

const deleteOption = (id = 1, options) => (
  options.filter((option) => option.id !== id)
);

const isSelect = component => (
  component.name === Select && true
);

export const select  = {
  renderOptions,
  getOptionTexts,
  addOption,
  editOption,
  deleteOption,
  isSelect,
};
