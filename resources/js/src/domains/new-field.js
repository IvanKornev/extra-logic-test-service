import { v4 as generateUuid } from 'uuid'; 

const initValues = {
  name: '',
  description: '',
  type: 'text',
};

const create = values => {
  const createdField = {
    uniqueId: generateUuid(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
  };
  alert(JSON.stringify(createdField));
  return createdField;
};

const newField = { initValues, create };
export { newField}
