const validator = require('./custom-form.validator');
const messages = require('./custom-form.messages');

const { customForms, formFields } = require('../db.json');

class CustomFormController {
  getAll(req, res) {
    return res.status(201).json({ formsList: customForms });
  }

  find(req, res) {
    const searchQuery = req.params.query.toLowerCase();
    const searchPattern = new RegExp(`${searchQuery}.*`, 'gi');

    const searchedForms = customForms.filter((form) => {
      const currentName = form.name.toLowerCase();
      const isSearchingForm = searchPattern.test(currentName);
      if (isSearchingForm) {
        return form;
      }
    });
    return res.status(201).json({ searchedForms });
  }

  remove(req, res) {
    const { formId } = req.body;
    let wasRemoved = false;
    customForms.forEach((form) => {
      if (form.id === formId) {
        wasRemoved = true;
      }
    });

    if (!wasRemoved) {
      return res.status(400).json({
        answer: messages.remove.error,
      });
    }
    return res.status(201).json({
      answer: messages.remove.success,
    });
  }

  get(req, res) {
    const formId = parseInt(req.params.formId);
    let receivedForm = {};
    
    customForms.forEach((form) => {
      if (form.id === formId) {
        receivedForm = form;
      }
    })
    formFields.forEach((form) => {
      if (form.id === formId) {
        receivedForm.fields = form.fields;
      }
    });

    return res.status(201).json({ receivedForm });
  }

  add(req, res) {
    const invalidMessage = validator.validate(req.body);
    if (invalidMessage) {
      return res.status(400).json({ answer: invalidMessage });
    }
    return res.status(201).json({
      answer: messages.add.success,
    });
  }
}

module.exports = new CustomFormController();
