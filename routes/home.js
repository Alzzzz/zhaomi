module.exports = {
  async index(ctx) {
    await ctx.render('index', {
      title: '着迷',
      desc: '高端私人定制',
    });
  },
};
