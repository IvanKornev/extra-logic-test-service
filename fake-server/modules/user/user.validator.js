const fs = require('fs');

class UserValidator {
  userIsExist(receivedData) {
    return new Promise((resolve) => {
      fs.readFile('users.txt', function(error, data) {
        const users = data.toString().split("\n");
        users.forEach((user) => {
          const [email, password, nickname] = user.split(' ');
          if (receivedData.email === email) {
            resolve(true);
          }
          if (receivedData.nickname === nickname) {
            resolve(true);
          }
        });
        resolve(false);
      });
    });
  }
}

module.exports = new UserValidator();
