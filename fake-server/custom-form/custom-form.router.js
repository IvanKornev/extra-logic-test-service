const controller = require('./custom-form.controller');

class CustomFormRouter {
  _routes = [
    {
      method: 'post',
      controllerMethod: 'add',
    },
    {
      method: 'get',
      controllerMethod: 'getAll',
    },
    {
      method: 'delete',
      controllerMethod: 'remove',
    },
  ];

  prepare(appInstance) {
    const path = '/custom-form';
    this._routes.forEach((route) => {
      const { method, controllerMethod } = route;
      appInstance[method](path, controller[controllerMethod]);
    });
  }
}

module.exports = new CustomFormRouter();
