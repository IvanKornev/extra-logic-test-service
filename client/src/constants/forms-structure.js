import { TextField, Select } from '@mui/material';

const fieldTypes = [
  { value: 'text', title: 'Текстовое поле (text)' },
  { value: 'textarea', title: 'Текстовая зона (textarea)' },
  { value: 'select', title: 'Селектор (select)' },
];

const userCommonInformation = [
  {
    name: 'email',
    label: 'Электронная почта',
    component: {
      name: TextField,
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    component: {
      name: TextField,
    },
  },
];

export const formsStructure = {
  option: [
    {
      name: 'title',
      label: 'Наименование',
      component: {
        name: TextField,
      },
    },
  ],
  field: [
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
  ],
  titleField: [
    {
      name: 'name',
      component: {
        name: TextField,
      },
    },
    {
      name: 'description',
      component: {
        name: TextField,
      },
    },
  ],
  user: {
    authorization: [
      ...userCommonInformation,
    ],
    registration: [
      {
        name: 'nickname',
        label: 'Имя пользователя',
        component: {
          name: TextField,
        },
      },
      ...userCommonInformation,
    ],
  },
};
