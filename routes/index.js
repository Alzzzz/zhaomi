const router = require('koa-router')();
const home = require('./home');
const about = require('./about');
const user = require('./user');
const posts = require('./post');

module.exports = (app) => {
  router.get('/', home.index);
  router.get('/about', about.index);
  router.get('/signup', user.signup);
  router.post('/signup', user.signup);
  router.get('/signin', user.signin);
  router.post('/signin', user.signin);
  router.get('/signout', user.signout);

  // 帖子
  router.get('/posts/new', posts.create);
  // 发布帖子
  router.post('/posts/new', posts.create);

  app.use(router.routes(), router.allowedMethods());
};
