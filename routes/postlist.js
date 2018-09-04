const PostModule = require('../models/post');
const CategoryModule = require('../models/category');

module.exports = {
  async index(ctx) {
    const cname = ctx.query.c;
    console.log(cname);
    let cid;
    if (cname) {
      const cateogry = await CategoryModule.findOne({ name: cname })
      cid = cateogry._id
    }
    const query = cid ? { category: cid } : {}
    const posts = await PostModule.find(query)
    await ctx.render('index', {
      title: '着迷',
      desc: 'Z&Jane 高端私人定制',
      posts,
    });
  },
};
