const router = require('koa-router')();
const home = require('./home');
const about = require('./about');
const user = require('./user');

module.exports = (app) => {
  router.get('/', home.index);
  router.get('/about', about.index);
  router.get('/signup', user.signup);

  app.use(router.routes(), router.allowedMethods());
};
