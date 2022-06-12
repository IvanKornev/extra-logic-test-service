import { faker } from '@faker-js/faker';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
  getSelectOptionTexts,
  selectOptionIsEmpty,
} from '@domains';

describe('Методы опции селектора', () => {
  it('Добавляет новую опцию', () => {
    const newOption = generateOptions();
    const result = addSelectOption(newOption);
    expect(result.value).toBe(newOption.value);
    expect(result.id).not.toBeNull();
  });

  it('Редактирует уже добавленную опцию', () => {
    const list = generateOptions(5);
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
    const list = generateOptions(5);
    const firstOption = list[0];
    const updatedList = removeSelectOption(firstOption.id, list);
    expect(updatedList[0].id).toBe(list[1].id);
  });

  it('Получает текст опции для дальнейшего рендеринга', () => {
    const newOption = generateOptions();
    const texts = getSelectOptionTexts(newOption, 1);
    expect(texts.primary).toBe(`1) Имя: ${newOption.title}`);
    expect(texts.secondary).toBe(`Значение: ${newOption.value}`);
  });

  it('Сокращает текст опции перед рендерингом', () => {
    const newOption = generateOptions();
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

const generateOptions = (count = 1) => {
  const options = [];
  for (let i = 1; i <= count; i += 1) {
    const newOption = {
      title: faker.word.noun(5),
      value: faker.word.noun(5),
    };
    options.push(addSelectOption(newOption));
  }
  if (options.length === 1) {
    return options[0];
  }
  return options;
};
