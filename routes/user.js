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
};
