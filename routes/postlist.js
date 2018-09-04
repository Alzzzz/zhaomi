const PostModule = require('../models/post');

module.exports = {
  async index(ctx) {
    const posts = await PostModule.find({});
    await ctx.render('index', {
      title: '着迷',
      desc: 'Z&Jane 高端私人定制',
      posts,
    });
  },
};
