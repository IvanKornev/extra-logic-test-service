import { TextField, Select } from '@mui/material';

export const fieldValues = {
  name: '',
  description: '',
  type: '',
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

export const messages = {
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

export const buttons = {
  navbar: [
    {
      color: 'secondary',
      text: 'Сохранить',
      action: 'save',
    },
    {
      color: 'error',
      text: 'Сбросить',
      action: 'reset',
    },
  ],
  editorModal: [
    {
      color: 'success',
      text: 'Сохранить',
      type: 'submit',
      action: 'save',
      canBeDisabled: true,
    },
    {
      color: 'error',
      text: 'Отмена',
      type: 'button',
      action: 'abort',
      canBeDisabled: false,
    },
  ],
};

export const autohideDefaultOptions = {
  isEnable: false,
  duration: 0,
};
