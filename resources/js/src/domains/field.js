import generateId from 'uniqid';

export const createField = (values, list) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name,
    description: values.description,
    type: values.type,
    isRequired: values.isRequired,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  return list.insert(createdField);
};

export const removeField = (id, list) => {
  const { removedNode } = list.remove(id);
  if (removedNode?.previous) {
    const previousNode = removedNode.previous.value;
    return previousNode;
  }
  if (removedNode?.next) {
    const nextNode = removedNode.next.value;
    return nextNode;
  }
  return null;
};

export const changeField = (id, values, list) => {
  list.change(id, values);
};

export const copyField = (id, list) => list.copy(id);

export const wasSelected = (fieldId, currentFieldId) =>
  fieldId && currentFieldId && fieldId === currentFieldId && true;
