const router = require('koa-router')();
const about = require('./about');
const user = require('./user');
const posts = require('./post');
const postList = require('./postlist');
const comments = require('./comments');

async function isLoginUser(ctx, next) {
  if (!ctx.session.user) {
    // 未登录
    ctx.flash = {
      warning: '未登录，请先登录',
    };
    return ctx.redirect('/signin');
  }
  await next();
}

async function isAdmin(ctx, next) {
  console.log(ctx.session);
  if (!ctx.session.user) {
    ctx.flash = { warning: '未登录, 请先登录' };
    return ctx.redirect('/signin');
  }
  if (!ctx.session.user.isAdmin) {
    ctx.flash = { warning: '没有权限' };
    return ctx.redirect('back');
  }
  await next();
}

module.exports = (app) => {
  router.get('/', postList.index);
  router.get('/about', about.index);
  router.get('/signup', user.signup);
  router.post('/signup', user.signup);
  router.get('/signin', user.signin);
  router.post('/signin', user.signin);
  router.get('/signout', user.signout);

  // 帖子
  // 发布帖子
  router.get('/posts/new', isLoginUser, posts.create);
  router.post('/posts/new', isLoginUser, posts.create);
  // 展示
  router.get('/posts/:id', posts.show);
  // 编辑
  router.get('/posts/:id/edit', isLoginUser, posts.edit);
  router.post('/posts/:id/edit', isLoginUser, posts.edit);
  // 删除
  router.get('/posts/:id/delete', isLoginUser, posts.destroy);

  // 评论
  router.post('/comments/new', isLoginUser, comments.create);
  router.get('/comments/:id/delete', isLoginUser, comments.destroy);


  app.use(router.routes(), router.allowedMethods());
};
