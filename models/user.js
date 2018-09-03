const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  account: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  isAmin: {
    type: Boolean,
    default: false,
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
