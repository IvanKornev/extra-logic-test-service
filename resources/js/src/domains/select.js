import { Select, MenuItem } from '@mui/material';
import generateId from 'uniqid';

const isSelect = (component) => component.name === Select && true;

const optionValues = {
  title: '',
  value: '',
};

const renderOptions = (component) =>
  component.options.map((option) => (
    <MenuItem key={generateId()} value={option.value}>
      {option.title}
    </MenuItem>
  ));

const getOptionTexts = (option, number = 1) => {
  const { title, value } = option;
  const texts = {
    primary: `${number}) Наименование: ${title}`,
    secondary: `Значение: ${value}`,
  };
  return texts;
};

const addOption = (values) => {
  const id = generateId();
  const { title, value } = values;
  return { id, title, value };
};

const editOption = (id, options) => {
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

const deleteOption = (id, options) =>
  options.filter((option) => option.id !== id);

export const select = {
  isSelect,
  optionValues,
  renderOptions,
  getOptionTexts,
  addOption,
  editOption,
  deleteOption,
};
