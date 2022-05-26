import {
  UilPlusCircle, UilTrashAlt, UilCopy, UilEditAlt,
} from '@iconscout/react-unicons';

const defaultValues = {
  form: {
    name: 'Новая форма',
    description: 'Описание новой формы',
  },
};

const menu = [
  { iconName: UilPlusCircle, action: () => alert('Добавление') },
  { iconName: UilEditAlt, action: () => alert('Редактирование') },
  { iconName: UilCopy, action: () => alert('Копирование') },
  { iconName: UilTrashAlt, action: () => alert('Удаление') },
];

const isEmpty = (fields = []) => (
  fields.length === 0 ? true : false
);

export const newForm = {
  defaultValues,
  menu,
  isEmpty,
};
