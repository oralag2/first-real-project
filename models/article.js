const { Schema, model } = require('mongoose');

const articleSchema = new Schema(
  {
    title: String,
    text: String,
    image: String,
    tags: [{ type: String }],
  },
  { timestamps: true },
  { typeKey: '$type' }
);

module.exports = model('Article', articleSchema);
