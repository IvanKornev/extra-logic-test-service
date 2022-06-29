import { generateFields } from '@lib/tests';
import { LinkedList } from '@data-structures';
import { createField, removeField, changeField, copyField } from '@domains';

describe('Методы нового поля', () => {
  let fieldsList;
  beforeEach(() => {
    fieldsList = new LinkedList();
  });

  it('Создает новое поле', () => {
    const newField = generateFields();
    createField(newField, fieldsList);
    expect(fieldsList.head.value.name).toBe(newField.name);
  });

  it('Удаляет поле', () => {
    const fields = generateFields(3);
    fields.forEach((field) => createField(field, fieldsList));

    const firstFieldId = fieldsList.head.value.uniqueId;
    expect(fieldsList.head.value.uniqueId).toBe(firstFieldId);
    removeField(firstFieldId, fieldsList);
    expect(fieldsList.head.value.uniqueId).not.toBe(firstFieldId);
  });

  it('Изменяет значения поля', () => {
    const [originalField, updatedField] = generateFields(2);

    createField(originalField, fieldsList);
    expect(fieldsList.head.value.name).toBe(originalField.name);

    changeField(fieldsList.head.value.uniqueId, updatedField, fieldsList);
    expect(fieldsList.head.value.name).toBe(updatedField.name);
  });

  it('Дублирует поле', () => {
    const newField = generateFields(1);
    createField(newField, fieldsList);

    const originalField = fieldsList.head.value;
    copyField(originalField.uniqueId, fieldsList);

    const copiedField = fieldsList.head.next.value;
    expect(originalField.name).toBe(copiedField.name);
    expect(originalField.uniqueId).not.toBe(copiedField.uniqueId);
  });
});
