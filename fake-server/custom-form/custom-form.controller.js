const validator = require('./custom-form.validator');

class CustomFormController {
  add(req, res) {
    const invalidMessage = validator.validate(req.body);
    if (invalidMessage) {
      return res.status(400).json({ answer: invalidMessage });
    }

    const successMessage = 'Форма успешно сохранена для'
      + ' использования пользователями';
    return res.status(201).json({ answer: successMessage });
  }
}

module.exports = new CustomFormController();
