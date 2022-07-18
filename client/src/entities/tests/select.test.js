import { componentsRenderer } from '@lib/for-tests';
import { selectIsEmpty, isSelect } from '@entities';

describe('Методы тега селектора', () => {
  it('Проверяет, является ли компонент селектором', () => {
    const paragraph = componentsRenderer.renderParagraph();
    expect(isSelect(paragraph)).toBeFalsy();
  });

  it('Проверяет, имеет ли опции селектор', () => {
    const fieldType = 'select';
    expect(selectIsEmpty(fieldType, [])).toBeTruthy();
    expect(selectIsEmpty(fieldType, ['option #1'])).toBeFalsy();
  });
});
