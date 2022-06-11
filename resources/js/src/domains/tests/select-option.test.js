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
    const updatedList = removeSelectOption(list[0].id, list);
    expect(updatedList[0].id).not.toBe(list[0].id);
    expect(updatedList[0].id).toBe(list[1].id);
  });

  it('Получает текст опции для дальнейшего рендеринга', () => {
    const newOption = generateOptions();
    const texts = getSelectOptionTexts(newOption, 1);
    expect(texts.primary).toBe(`1) Наименование: ${newOption.title}`);
    expect(texts.secondary).toBe(`Значение: ${newOption.value}`);
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
      title: faker.word.adverb(1),
      value: faker.word.adverb(1),
    };
    options.push(addSelectOption(newOption));
  }
  if (options.length === 1) {
    return options[0];
  }
  return options;
};
