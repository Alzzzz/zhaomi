const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  meta: {
    createAt: {
      type: Date,
      defaut: Date.now(),
    },
  },
});

module.exports = mongoose.model('Comment', PostSchema);
