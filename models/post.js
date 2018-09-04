const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  pv: {
    type: Number,
    default: 0,
  },
  meta: {
    createAt: {
      type: Date,
      defaut: Date.now(),
    },
    updateAt: {
      type: Date,
      defaut: Date.now(),
    },
  },
});

PostSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = Date.now();
    this.meta.updateAt = this.meta.createAt;
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
