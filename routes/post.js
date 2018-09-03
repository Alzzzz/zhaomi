const PostModule = require('../models/post');

module.exports = {
  async create(ctx) {
    if(ctx.method === 'GET'){
      await ctx.render('create', {
        title: '新建文章'
      });
      return;
    }

    const post = Object.assign(ctx.request.body, {
      author: ctx.session.user._id
    })

    const res = await PostModule.create(post);
    ctx.flash = { success: '发布成功' };
    ctx.redirect(`/post/${res._id}`);
  },
}
