import { TextField, Select } from "@mui/material";

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

export const fieldEditor = { fields };
