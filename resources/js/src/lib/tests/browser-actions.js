import { faker } from '@faker-js/faker';

export const createField = (browserInstance, additionalCallback) => {
  browserInstance.waitForElementVisible('body').click('#menu__icon_add');
  const fieldsNames = ['name', 'description'];
  fillInputs('#new-field-editor', fieldsNames);

  if (typeof additionalCallback === 'function') {
    additionalCallback();
  }
  const xpathValue = '//*[@id="creator-modal__button_save field"]';
  browserInstance.click('xpath', xpathValue);
};

export const fillInputs = (domainPrefix, fieldsNames) => {
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
