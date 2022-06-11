import React from 'react';
import renderer from 'react-test-renderer';

import { selectHasOptions, isSelect } from '@domains';

describe('Методы тега селектора', () => {
  it('Проверяет, является ли компонент селектором', () => {
    const paragraph = renderParagraph();
    expect(isSelect(paragraph)).toBeFalsy();
  });
  
  it('Проверяет, имеет ли опции селектор', () => {
    const elemType = 'select';
    expect(selectHasOptions(elemType, [])).toBeFalsy();
    expect(selectHasOptions(elemType, ['option #1'])).toBeTruthy();
  });
});

const renderParagraph = () => {
  const Paragraph = () => <p>Параграф</p>;
  return renderer.create(<Paragraph />)
};
