const { faker } = require('@faker-js/faker');

describe('Страница новой формы', () => {
  before((browser) => browser.navigateTo('http://localhost:3000/'));

  it('Создаёт поле новой формы', (browser) => {
    browser.waitForElementVisible('body').click('svg[id=menu__icon_add]');
    fillFields('new-field-editor');
    browser.click('button[id=editor-modal__button_save]');
    browser.assert.elementPresent('div[id=new-form__fields_0');
  });

  it('Изменяет созданное поле', (browser) => {
    browser.click('div[id=new-form__fields_0]');
    fillFields('editing-field');
    browser.click('button[id=editing-field__button_save]');
  });

  it('Отправляет новую форму на сервер', (browser) => {
    browser.click('button[id=navbar__button_save]');
    const xpathValue = '//*[@id="event-snackbar"]/div/div[2]';
    browser.getText('xpath', xpathValue, function (text) {
      const expectedText = 'Форма успешно сохранена для использования '
        + 'пользователями';
      this.assert.equal(text.value, expectedText);
    });
  });

  after((browser) => browser.end());
});

const fillFields = (domainPrefix) => {
  const fieldsNames = ['name', 'description'];
  fieldsNames.forEach((fieldName) => {
    const selector = `input[id=${domainPrefix}__field_${fieldName}]`;
    browser.getValue(selector, (results) => {
      if (results.value) {
        browser.clearValue(selector);
      }
      browser.setValue(selector, faker.word.noun(10));
    });
  });
};
