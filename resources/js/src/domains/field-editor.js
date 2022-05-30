import { TextField, Select } from '@mui/material';
import generateId from 'uniqid';

const defaultValues = {
  name: '',
  description: '',
  type: 'text',
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


const create = (values) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  return createdField;
};

const makeRequired = (id, stateAction) => {
  stateAction((list) => {
    const foundField = list.find(id);
    const { uniqueId, isRequired } = foundField.value;
    const value = {
      isRequired: !isRequired,
      ...foundField.value,
    };
    return list.change(uniqueId, value);
  });
};

export const fieldEditor = {
  defaultValues,
  fields,
  create,
  makeRequired,
};
