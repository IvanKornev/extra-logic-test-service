import { TextField, Select } from '@mui/material';
import generateId from 'uniqid';

const defaultValues = {
  name: '',
  description: '',
  type: 'text',
};

const create = (values) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
    isRequired: false,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }

  alert(JSON.stringify(createdField));
  return createdField;
};

const fields = [
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
      options: [
        { value: 'text', title: 'Текстовое поле (text)' },
        { value: 'textarea', title: 'Текстовая зона (textarea)' },
        { value: 'select', title: 'Селектор (select)' },
      ],
    },
  },
];

export const fieldEditor = {
  defaultValues,
  create,
  fields,
};
