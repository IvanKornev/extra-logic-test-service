import { UilPlusCircle, UilTrashAlt, UilCopy } from '@iconscout/react-unicons';

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

const isEmpty = (fields = []) => fields.length === 0;

export const newForm = {
  createMenu,
  isEmpty,
};
