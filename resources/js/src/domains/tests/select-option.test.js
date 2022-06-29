import { faker } from '@faker-js/faker';
import { generateSelectOptions } from '@lib/tests';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
  selectOptionIsEmpty,
  compareOptionLists,
} from '@domains';

describe('Методы опций селектора', () => {
  it('Добавляет новую опцию', () => {
    const newOption = generateSelectOptions();
    const result = addSelectOption(newOption);
    expect(result.title).toBe(newOption.title);
    expect(result.id).not.toBeNull();
  });

  it('Редактирует уже добавленную опцию', () => {
    const list = generateSelectOptions(5);
    const originalOption = list[1];

    const updateData = {
      ...originalOption,
      title: faker.word.adverb(1),
    };
    const updatedOption = editSelectOption(updateData, list)[1];

    expect(originalOption.id).toBe(updatedOption.id);
    expect(originalOption.title).not.toBe(updatedOption.title);
  });

  it('Удаляет опцию из списка', () => {
    const list = generateSelectOptions(5);
    const firstOption = list[0];
    const updatedList = removeSelectOption(firstOption.id, list);
    expect(updatedList[0].id).toBe(list[1].id);
  });

  it('Сравнивает два одинаковых списка опций', () => {
    const optionsList = generateSelectOptions(8);
    const wasUpdated = compareOptionLists(optionsList, optionsList);
    expect(wasUpdated).toBeFalsy();
  });

  it('Сравнивает два разных списка опций', () => {
    const originalList = generateSelectOptions(4);

    const newOption = generateSelectOptions();
    const updatedList = [...originalList, newOption];

    const wasUpdated = compareOptionLists(originalList, updatedList);
    expect(wasUpdated).toBeTruthy();
  });

  it('Проверяет свойства опции на отсутствие', () => {
    const newOption = {
      value: faker.word.adverb(1),
    };
    expect(selectOptionIsEmpty(newOption)).toBeTruthy();
    newOption.title = faker.word.adverb(1);
    expect(selectOptionIsEmpty(newOption)).toBeFalsy();
  });
});
