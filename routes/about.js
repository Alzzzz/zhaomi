module.exports = {
  async index(ctx) {
    await ctx.render('index', {
      title: '关于着迷',
      desc: 'Z&Jane',
    });
  },
};
