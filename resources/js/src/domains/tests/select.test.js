import { componentsRenderer } from '@lib/tests';
import { selectHasOptions, isSelect } from '@domains';

describe('Методы тега селектора', () => {
  it('Проверяет, является ли компонент селектором', () => {
    const paragraph = componentsRenderer.renderParagraph();
    expect(isSelect(paragraph)).toBeFalsy();
  });

  it('Проверяет, имеет ли опции селектор', () => {
    expect(selectHasOptions([])).toBeFalsy();
    expect(selectHasOptions(['option #1'])).toBeTruthy();
  });
});
