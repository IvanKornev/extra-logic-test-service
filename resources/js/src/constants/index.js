import { TextField, Select } from '@mui/material';

export const fieldValues = {
  name: '',
  description: '',
  type: 'text',
  isRequired: false,
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

export const optionFields = Object.keys(optionLabels);

export const formValues = {
  name: 'Новая форма',
  description: 'Описание новой формы',
};

export const formFields = Object.keys(formValues);

export const snackbarMessages = {
  form: {
    reset: {
      success: 'Форма сброшена до начального состояния',
      fail: 'Форма не была сброшена',
    },
    save: {
      success: 'Форма успешно сохранена для использования пользователями',
      fail: 'Форма не была сохранена',
    },
  },
};
