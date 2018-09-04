const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    }
  },
});

module.exports = mongoose.model('Category', CategorySchema);
