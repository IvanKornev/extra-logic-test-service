const { faker } = require('@faker-js/faker');

describe('Страница новой формы', () => {
  before((browser) => browser.navigateTo('http://localhost:3000/'));

  it('Создаёт поле новой формы', (browser) => {
    createField(browser);
    browser.assert.elementsCount('.new-form__field', 1);
  });

  it('Дважды копирует созданное поле', (browser) => {
    browser.click('.new-form__field div:nth-of-type(1)');
    for (let i = 0; i < 2; i += 1) {
      browser.click('#menu__icon_copy');
    }
    browser.assert.elementsCount('.new-form__field', 3);
  });

  it('Удаляет поле новой формы', (browser) => {
    browser.click('.new-form__field div:nth-of-type(2)');
    browser.click('#menu__icon_remove');
    browser.assert.elementsCount('.new-form__field', 2);
  });

  it('Изменяет поле, также делая его обязательным', (browser) => {
    browser.click('.new-form__field div:nth-of-type(2)');
    const fieldsNames = ['name', 'description'];
    fillInputs('#editing-field', fieldsNames);

    const switchXpath = '//*[@id="root"]/main/section/div/' +
      ' div/div[1]/div/form/div[4]/div/label';
    browser.click('xpath', switchXpath);
    browser.click('#editing-field__button_save');

    browser.getText('.new-form__field_name span:last-child', (text) => {
      browser.assert.equal(text.value, '*');
    });
  });

  it('Добавляет селекторное поле с 3 опциями', (browser) => {
    const optionsCount = 3;
    createField(browser, () => {
      browser.click('#new-field-editor__field_type');
      browser.click('#new-field-editor__option_3');
      for (let i = 1; i <= optionsCount; i += 1) {
        createSelectOption(browser);
      }
    });
    const optionClass = '.options-list__option_default';
    browser.assert.elementsCount(optionClass, optionsCount);
  });

  it('Удалив прежние опции селектора, добавляет одну новую', (browser) => {
    browser.click('.new-form__field:last-child');
    browser.findElements('.options-list__option_default', ({ value }) => {
      const optionsCount = value.length;
      for (let i = 1; i <= optionsCount; i += 1) {
        browser.click('.option__actions_remove:last-child');
      }
    });

    createSelectOption(browser);
    browser.click('#editing-field__button_save');

    const optionClass = '.options-list__option_default';
    browser.assert.elementsCount(optionClass, 1);
  });

  it('Редактирует единственную опцию поля-селектора', (browser) => {
    browser.click('.new-form__field:last-child');
    browser.click('.option__actions_edit');
    fillInputs('#option', ['title', 'value']);
    browser.click('.option__actions_confirm-changes');
    browser.click('#editing-field__button_save');
  });

  it('Отправляет новую форму на сервер', (browser) => {
    browser.click('#navbar__button_save');
    const xpathValue = '//*[@id="event-snackbar"]/div/div[2]';
    browser.getText('xpath', xpathValue, (text) => {
      const expectedText = 'Форма успешно сохранена'
        + ' для использования пользователями';
      browser.assert.equal(text.value, expectedText);
    });
  });

  after((browser) => browser.end());
});

const createField = (browserInstance, additionalCallback) => {
  browserInstance.waitForElementVisible('body').click('#menu__icon_add');
  const fieldsNames = ['name', 'description'];
  fillInputs('#new-field-editor', fieldsNames);

  if (typeof additionalCallback === 'function') {
    additionalCallback();
  }
  const xpathValue = '//*[@id="creator-modal__button_save field"]';
  browserInstance.click('xpath', xpathValue);
};

const createSelectOption = (browserInstance) => {
  browserInstance.click('#options-list__button_add');
  const fieldsNames = ['title', 'value'];
  fillInputs('#new-option-creator', fieldsNames);

  const buttonXpath = '//*[@id="creator-modal__button_save option"]';
  browserInstance.click('xpath', buttonXpath);
};

const fillInputs = (domainPrefix, fieldsNames) => {
  fieldsNames.forEach((fieldName) => {
    const selector = `${domainPrefix}__field_${fieldName}`;
    browser.getValue(selector, (results) => {
      if (results.value) {
        browser.clearValue(selector);
      }
      browser.setValue(selector, faker.word.noun(10));
    });
  });
};
