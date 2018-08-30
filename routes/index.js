const router = require('koa-router')();
const home = require('./home');
const about = require('./about');

module.exports = (app) => {
  router.get('/', home.index);
  router.get('/about', about.index);

  app.use(router.routes(), router.allowedMethods());
};
