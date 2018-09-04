const PostModule = require('../models/post');

module.exports = {
  async create(ctx) {
    if (ctx.method === 'GET') {
      await ctx.render('create', {
        title: '新建文章',
      });
      return;
    }

    const post = Object.assign(ctx.request.body, {
      author: ctx.session.user._id,
    });

    const res = await PostModule.create(post);
    ctx.flash = { success: '发布成功' };
    ctx.redirect(`/posts/${res._id}`);
  },

  async show(ctx) {
    const post = await PostModule.findById(ctx.params.id).populate({
      path: 'author',
      select: 'name',
    });

    await ctx.render('post', {
      title: post.title,
      post,
    });
  },

  async edit(ctx) {
    if (ctx.method === 'GET') {
      const post = await PostModule.findById(ctx.params.id);
      if (!post) {
        throw new Error('文章不存在');
      }
      console.log(`author = ${post.author.toString()}`);
      console.log(`sessiong = ${ctx.session.user._id.toString()}`);
      if (post.author.toString() !== ctx.session.user._id.toString()) {
        throw new Error('没有权限');
      }

      await ctx.render('edit', {
        title: '更新文章',
        post,
      });
      return;
    }

    const {
      title,
      content,
    } = ctx.request.body;

    await PostModule.findByIdAndUpdate(ctx.params.id, {
      title,
      content,
    });

    ctx.flash = {
      success: '文章更新成功',
    };

    ctx.redirect(`/posts/${ctx.params.id}`);
  },

  async destroy(ctx) {
    const post = await PostModule.findById(ctx.params.id);
    if (!post) {
      throw new Error('文章不存在');
    }

    console.log(post.author, ctx.session.user._id);
    if (post.author.toString() !== ctx.session.user._id.toString()) {
      throw new Error('没有权限');
    }

    await PostModule.findByIdAndRemove(ctx.params.id);
    ctx.flash = {
      success: '删除文章成功',
    };
    ctx.redirect('/');
  },
};
