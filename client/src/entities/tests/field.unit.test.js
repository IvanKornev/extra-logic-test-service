import { generateFields } from '@lib/tests';
import { DoublyLinkedList } from '@data-structures';
import {
  createField,
  removeField,
  changeField,
  copyField,
  getFieldClasses,
} from '@entities';

describe('Методы нового поля', () => {
  let fieldsList;
  beforeEach(() => {
    fieldsList = new DoublyLinkedList();
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

  it('Получает CSS-классы для заглавного поля', () => {
    const classes = getFieldClasses(false, {}, 'title');
    const lastClass = classes.pop();
    expect(lastClass).toBe('new-form__field');
  });

  it('Вызывает ошибку при получении классов для некорректного типа поля', () => {
    const call = () => {
      getFieldClasses(true, {}, 'custom');
    };
    const expectedError = 'Допустимые типы поля: title, default';
    expect(call).toThrow(expectedError);
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
