import {
  UilPlusCircle,
  UilTrashAlt,
  UilCopy,
  UilEditAlt,
} from '@iconscout/react-unicons';

const defaultValues = {
  form: {
    name: 'Новая форма',
    description: 'Описание новой формы',
  },
};

const menu = [
  {
    iconName: UilPlusCircle,
    tooltip: 'Добавить поле',
    action: () => alert('Добавление')
  },
  {
    iconName: UilEditAlt,
    tooltip: 'Редактировать это поле',
    action: () => alert('Редактирование')
  },
  {
    iconName: UilCopy,
    tooltip: 'Копировать это поле',
    action: () => alert('Копирование')
  },
  {
    iconName: UilTrashAlt,
    tooltip: 'Удалить это поле',
    action: () => alert('Удаление')
  },
];

const isEmpty = (fields = []) => (fields.length === 0 ? true : false);

export const newForm = {
  defaultValues,
  menu,
  isEmpty,
};
