const controller = require('./custom-form.controller');

class CustomFormRouter {
  _routes = [
    {
      method: 'post',
      path: '/custom-form',
      controllerMethod: 'add',
    },
    {
      method: 'get',
      path: '/custom-form',
      controllerMethod: 'getAll',
    },
  ];

  prepare(appInstance) {
    this._routes.forEach((route) => {
      const { method, path, controllerMethod } = route;
      appInstance[method](path, controller[controllerMethod]);
    });
  }
}

module.exports = new CustomFormRouter();