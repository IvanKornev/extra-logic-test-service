const validator = require('./custom-form.validator');
const messages = require('./custom-form.messages');

const { customForms } = require('../db.json');

class CustomFormController {
  getAll(req, res) {
    return res.status(201).json({ formsList: customForms });
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
