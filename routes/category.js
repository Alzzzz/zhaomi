const CategoryModel = require('../models/category');

module.exports = {
  async list(ctx) {
    const categories = await CategoryModel.find({});

    await ctx.render('category', {
      title: '分类管理',
      categories,
    });
  },
};