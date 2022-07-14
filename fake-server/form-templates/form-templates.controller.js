const { templates } = require('../db.json'); 

class FormTemplatesController {

  getAll(req, res) {
    const data = {
      templatesList: templates,
    };
    return res.status(201).json(data);
  }

}

module.exports = new FormTemplatesController();
