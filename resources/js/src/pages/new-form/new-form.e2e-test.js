const { faker } = require('@faker-js/faker');

describe('Страница новой формы', () => {
  before((browser) => browser.navigateTo('http://localhost:3000/'));

  it('Создаёт поле новой формы', (browser) => {
    browser.waitForElementVisible('body').click('svg[id=menu__icon_add]');
    fillFields('new-field-editor');
    browser.click('button[id=editor-modal__button_save]');
    browser.assert.elementsCount('.new-form__field', 1);
  });

  it('Дважды копирует созданное поле', (browser) => {
    browser.click('.new-form__field div:nth-of-type(1)');
    for (let i = 0; i < 2; i += 1) {
      browser.click('svg[id=menu__icon_copy]');
    }
    browser.assert.elementsCount('.new-form__field', 3);
  });

  it('Удаляет поле новой формы', (browser) => {
    browser.click('.new-form__field div:nth-of-type(2)');
    browser.click('svg[id=menu__icon_remove]');
    browser.assert.elementsCount('.new-form__field', 2);
  });

  it('Изменяет одно из полей', (browser) => {
    browser.click('.new-form__field div:nth-of-type(2)');
    fillFields('editing-field');
    browser.click('button[id=editing-field__button_save]');
  });

  it('Отправляет новую форму на сервер', (browser) => {
    browser.click('button[id=navbar__button_save]');
    const xpathValue = '//*[@id="event-snackbar"]/div/div[2]';
    browser.getText('xpath', xpathValue, (text) => {
      const expectedText = 'Форма успешно сохранена для использования пользователями';
      browser.assert.equal(text.value, expectedText);
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
