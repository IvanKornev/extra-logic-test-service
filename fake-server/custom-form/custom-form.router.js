const controller = require('./custom-form.controller');

class CustomFormRouter {
  _routes = [
    {
      method: 'post',
      controllerMethod: 'add',
      path: '/custom-form',
    },
    {
      method: 'get',
      controllerMethod: 'getAll',
      path: '/custom-form',
    },
    {
      method: 'get',
      controllerMethod: 'find',
      path: '/custom-form/search/:query',
    },
    {
      method: 'delete',
      controllerMethod: 'remove',
      path: '/custom-form',
    },
    {
      method: 'get',
      controllerMethod: 'get',
      path: '/custom-form/:formId',
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
