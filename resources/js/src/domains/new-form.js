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

const createMenu = (actionsCallbacks = {}) => [
  {
    iconName: UilPlusCircle,
    tooltip: 'Добавить поле',
    action: actionsCallbacks.add,
  },
  {
    iconName: UilCopy,
    tooltip: 'Копировать это поле',
    action: actionsCallbacks.copy,
  },
  {
    iconName: UilTrashAlt,
    tooltip: 'Удалить это поле',
    action: actionsCallbacks.remove,
  },
];

const isEmpty = (fields = []) => (fields.length === 0);

export const newForm = {
  defaultValues,
  createMenu,
  isEmpty,
};
