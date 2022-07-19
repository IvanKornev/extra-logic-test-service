const fs = require('fs');
const messages = require('./user.messages');
const { userIsExist } = require('./user.validator');

class UserController {
  register(req, res) {
    userIsExist(req.body).then((isExist) => {
      if (isExist) {
        return res.status(400).json({
          message: messages.register.error,
        });
      }

      const newUser = Array.from(Object.values(req.body));
      const savingRow = `${newUser.join(' ')}\n`;
      fs.appendFile('users.txt', savingRow, () => {
        return res.status(201).json({
          message: messages.register.success,
        });
      }); 
    });
  }

  authorize(req, res) {
    const newUser = req.body;
    console.log(newUser);
  }
}

module.exports = new UserController();
