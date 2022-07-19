const controller = require('./user.controller');

class UserRouter {
  _routes = [
    {
      method: 'post',
      path: '/user/new',
      controllerMethod: 'register',
    },
    {
      method: 'post',
      path: '/user',
      controllerMethod: 'authorize',
    },
  ];

  prepare(appInstance) {
    this._routes.forEach((route) => {
      const { method, path, controllerMethod } = route;
      appInstance[method](path, controller[controllerMethod]);
    });
  }
}

module.exports = new UserRouter();
