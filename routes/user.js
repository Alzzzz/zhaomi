const bcrypt = require('bcrypt');
const userModule = require('../models/user');

module.exports = {
  async signup(ctx) {
    if (ctx.method === 'GET') {
      await ctx.render('signup', {
        title: '注册',
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);

    let {
      name,
      email,
      password,
      account = name,
    } = ctx.request.body;

    password = await bcrypt.hash(password, salt);

    console.log(`account = ${account}`);

    const user = {
      name,
      email,
      password,
      account,
    };

    console.log(`user = ${user}`);

    console.log(`开始数据库操作，date = ${new Date()}`);
    const result = await userModule.create(user);

    console.log(`数据库操作结束, result=${result}, date = ${new Date()}`);
    ctx.body = result;
  },

  async signin (ctx, next) {
    if(ctx.method === 'GET'){
      await ctx.render('signin', {
        title: '用户登录',
      });
      return;
    }

    const {
      name,
      password,
    } = ctx.request.body;
    //数据库获取user
    const user = await userModule.findOne({name});
    //判断user密码是否正确
    if(user && await bcrypt.compare(password, user.password)){
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
      };

      ctx.redirect('/');
    } else {
      ctx.body = '用户名或密码错误';
    }
  },
};
