import React from 'react';
import renderer from 'react-test-renderer';

const renderParagraph = () => {
  const Paragraph = () => <p>Параграф</p>;
  return renderer.create(<Paragraph />);
};

export const componentsRenderer = {
  renderParagraph,
};
