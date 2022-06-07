import { UilPlusCircle, UilTrashAlt, UilCopy } from '@iconscout/react-unicons';
import { form } from '@global-states';

const createMenu = (showEditorAction) => [
  {
    iconName: UilPlusCircle,
    tooltip: 'Добавить поле',
    action: {
      name: 'add',
      callback: () => showEditorAction(true),
    },
  },
  {
    iconName: UilCopy,
    tooltip: 'Копировать это поле',
    action: {
      name: 'copy',
      callback: () => form.copyField(),
    },
  },
  {
    iconName: UilTrashAlt,
    tooltip: 'Удалить это поле',
    action: {
      name: 'remove',
      callback: () => form.removeField(),
    },
  },
];

const isEmpty = (fields = []) => fields.length === 0;

export const newForm = {
  createMenu,
  isEmpty,
};
