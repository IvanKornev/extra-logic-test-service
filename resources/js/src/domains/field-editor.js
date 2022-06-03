import { TextField, Select } from '@mui/material';
import { LinkedListConverter } from '@lib/converters';
import generateId from 'uniqid';

const defaultValues = {
  name: '',
  description: '',
  type: 'text',
};

const types = [
  { value: 'text', title: 'Текстовое поле (text)' },
  { value: 'textarea', title: 'Текстовая зона (textarea)' },
  { value: 'select', title: 'Селектор (select)' },
];

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
      options: types,
    },
  },
];

const wasSelected = (fieldId, currentFieldId) => {
  if (!fieldId || !currentFieldId) {
    return;
  }
  return fieldId === currentFieldId ? true : false;
};

const create = (values) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
    isRequired: false,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  return createdField;
};

const copy = (id, actions) => {
  const { updateFields, setCurrentField } = actions;
  updateFields((list) => {
    const results = list.copy(id);
    setCurrentField(results.copiedValue);
    return results.list;
  });
};

const remove = (id, updateFields, refs) => {
  const changedList = updateFields((list) => list.remove(id));
  const { length } = LinkedListConverter.toArray(changedList);

  const { mainFieldRef, titleFieldRef } = refs;
  if (length >= 1) {
    return mainFieldRef.current.click();
  }
  titleFieldRef.current.click();
  return changedList;
};

export const fieldEditor = {
  types,
  defaultValues,
  fields,
  wasSelected,
  create,
  copy,
  remove,
};
