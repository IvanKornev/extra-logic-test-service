const messages = require('./custom-form.messages');

class CustomFormValidator {
  #failMessage = null;
  #isValid = true;

  validate(form) {
    const { title, fields } = form;
    this.#checkTitle(title);
    this.#checkFields(fields);

    if (!this.#isValid) {
      return this.#failMessage;
    }
  }

  #checkTitle(title) {
    const { name, description } = title;
    if (!name || !description) {
      this.#isValid = false;
      this.#failMessage = messages.add.error.title;
    }
  }

  #checkFields(fields) {
    if (fields.length === 0) {
      this.#isValid = false;
      this.#failMessage = messages.add.error.fields;
    }
  }
}

module.exports = new CustomFormValidator();
