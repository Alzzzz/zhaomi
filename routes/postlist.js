const PostModule = require('../models/post');
const CategoryModule = require('../models/category');

module.exports = {
  async index(ctx) {
    const pageSize = 15;
    const currentPage = parseInt(ctx.query.page) || 1;
    const allPostsCount = await PostModule.count();
    const pageCount = Math.ceil(allPostsCount / pageSize);
    const pageStart = currentPage - 2 > 0 ? currentPage - 2 : 1
    const pageEnd = pageStart + 4 >= pageCount ? pageCount : pageStart + 4

    const cname = ctx.query.c;
    const baseUrl =  cname ? `${ctx.path}?c=${cname}&page=` : `${ctx.path}?page=`
    console.log(cname);
    let cid;
    if (cname) {
      const cateogry = await CategoryModule.findOne({ name: cname })
      cid = cateogry._id
    }
    const query = cid ? { category: cid } : {}
    const posts = await PostModule.find(query).skip((currentPage - 1)* pageSize).limit(pageSize);
    await ctx.render('index', {
      title: '着迷',
      desc: 'Z&Jane 高端私人定制',
      posts,
      currentPage,
      pageCount,
      pageStart,
      pageEnd,
      baseUrl,
    });
  },
};
