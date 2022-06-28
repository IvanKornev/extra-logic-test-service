import { UilPlusCircle, UilTrashAlt, UilCopy } from '@iconscout/react-unicons';
import { form } from '@global-states';

const createMenu = (creatorRef) => [
  {
    iconName: UilPlusCircle,
    tooltip: 'Добавить поле',
    action: {
      name: 'add',
      callback: () => creatorRef.current.show(),
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

const hasError = (fieldName, formikInstance) => {
  const { touched, errors } = formikInstance;
  if (touched[fieldName] && errors[fieldName]) {
    return true;
  }
  return false;
};

const isEmpty = (fields = []) => fields.length === 0;

export const newForm = {
  createMenu,
  hasError,
  isEmpty,
};
