import { UilPlusCircle, UilTrashAlt, UilCopy } from '@iconscout/react-unicons';
import { formState } from '@global-states';

const prepareMenuList = (creatorRef) => [
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
      callback: () => formState.copyField(),
    },
  },
  {
    iconName: UilTrashAlt,
    tooltip: 'Удалить это поле',
    action: {
      name: 'remove',
      callback: () => formState.removeField(),
    },
  },
];

const hasError = (fieldName, formInstance) => {
  const { touched, errors } = formInstance;
  if (touched[fieldName] && errors[fieldName]) {
    return true;
  }
  return false;
};

const isEmpty = (fields = []) => fields.length === 0;

export const newForm = {
  prepareMenuList,
  hasError,
  isEmpty,
};
