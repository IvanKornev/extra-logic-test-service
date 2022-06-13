import generateId from 'uniqid';
import PropTypes from 'prop-types';

export const fieldAttributes = PropTypes.shape({
  uniqueId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'textarea', 'select']),
  isRequired: PropTypes.bool,
});

export const createField = (values, list) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
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

  let remainedNode = null;
  if (removedNode?.next) {
    remainedNode = removedNode.next.value;
  }
  if (list.head && !removedNode?.next) {
    remainedNode = list.head.value;
  }

  return { removedNode, remainedNode };
};

export const changeField = (id, values, list) => {
  list.change(id, values);
};

export const copyField = (id, list) => list.copy(id);

export const wasSelected = (fieldId, currentFieldId) =>
  fieldId && currentFieldId && fieldId === currentFieldId && true;
