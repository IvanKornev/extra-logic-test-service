const controller = require('./form-templates.controller');

class FormTemplatesRouter {
  _routes = [
    {
      method: 'get',
      path: '/form-templates',
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

module.exports = new FormTemplatesRouter();
