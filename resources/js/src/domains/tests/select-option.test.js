import { faker } from '@faker-js/faker';
import { generateSelectOptions } from '@lib/tests';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
  getSelectOptionTexts,
  selectOptionIsEmpty,
  compareOptionLists,
} from '@domains';

describe('Методы опций селектора', () => {
  it('Добавляет новую опцию', () => {
    const newOption = generateSelectOptions();
    const result = addSelectOption(newOption);
    expect(result.value).toBe(newOption.value);
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

  it('Получает текст опции для дальнейшего рендеринга', () => {
    const newOption = generateSelectOptions();
    const texts = getSelectOptionTexts(newOption, 1);
    expect(texts.primary).toBe(`1) Имя: ${newOption.title}`);
    expect(texts.secondary).toBe(`Значение: ${newOption.value}`);
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

  it('Сокращает текст опции перед рендерингом', () => {
    const newOption = generateSelectOptions();
    newOption.title = newOption.title.padEnd(30, 's');

    const texts = getSelectOptionTexts(newOption, 1);
    const pattern = /\d\) Имя: \w*\.{3}/gi;
    expect(texts.primary).toMatch(pattern);
  });

  it('Проверяет свойства опции на отсутствие', () => {
    const newOption = {
      title: faker.word.adverb(1),
    };
    expect(selectOptionIsEmpty(newOption)).toBeTruthy();
    newOption.value = faker.word.adverb(1);
    expect(selectOptionIsEmpty(newOption)).toBeFalsy();
  });
});
