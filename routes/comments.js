const CommentModule = require('../models/comment');

module.exports = {
  async create(ctx) {
    const comment = Object.assign(ctx.request.body, {
      from: ctx.session.user._id,
    });
    await CommentModule.create(comment);
    ctx.flash = {
      success: '评论成功',
    };
    ctx.redirect('back');
  },
  async destroy(ctx) {
    const comment = await CommentModule.findById(ctx.params.id);
    if (!comment) {
      throw new Error('留言不存在');
    }
    if (comment.from.toString() !== ctx.session.user._id.toString()) {
      throw new Error('没有权限');
    }
    await CommentModule.findByIdAndRemove(ctx.params.id);
    ctx.flash = { success: '成功删除留言' };
    ctx.redirect('back');
  },
};
