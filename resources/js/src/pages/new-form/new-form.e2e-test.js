const { faker } = require('@faker-js/faker');

describe('Страница новой формы', () => {
  before((browser) => browser.navigateTo('http://localhost:3000/'));

  it('Создаёт поле новой формы', (browser) => {
    browser.waitForElementVisible('body').click('svg[id=menu__icon_add]');
    const fieldsNames = ['name', 'description'];
    fieldsNames.forEach((fieldName) => {
      const id = `new-field-editor__field_${fieldName}`;
      browser.setValue(`input[id=${id}]`, faker.word.noun(10));
    });
    browser.click('button[id=editor-modal__button_save]');
    browser.assert.elementPresent('div[id=new-form__fields_0');
  });

  after((browser) => browser.end());
});
