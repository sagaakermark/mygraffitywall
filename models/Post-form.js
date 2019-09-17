const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  img: String,
  title: String,
  description: String,
  artist: String,
  area: String,
  adress: String,
  postBy: String,
  approved: { type: Boolean, default: false }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
