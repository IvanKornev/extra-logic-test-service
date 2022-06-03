import { TextField, Select } from '@mui/material';

export const fieldValues = {
  name: '',
  description: '',
  type: 'text',
};
  
export const fieldTypes = [
  { value: 'text', title: 'Текстовое поле (text)' },
  { value: 'textarea', title: 'Текстовая зона (textarea)' },
  { value: 'select', title: 'Селектор (select)' },
];
  
export const fieldFormStructure = [
  {
    name: 'name',
    label: 'Название поля',
    component: {
      name: TextField,
    },
  },
  {
    name: 'description',
    label: 'Описание поля',
    component: {
      name: TextField,
    },
  },
  {
    name: 'type',
    label: 'Тип поля',
    component: {
      name: Select,
      options: fieldTypes,
    },
  },
];

export const optionValues = {
  title: '',
  value: '',
};
  
export const optionLabels = {
  title: 'Наименование',
  value: 'Значение',
};

const formValues = {
  name: 'Новая форма',
  description: 'Описание новой формы',
};

export const formFields = Object.keys(formValues);
