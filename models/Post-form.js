const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  img: String,
  title: { type: String, default: "Streetart" },
  description: {
    type: String,
    default:
      "No information provided. If you are familiar with the work or artist, please update the post with the rigth information."
  },
  artist: { type: String, default: "Unkown" },
  area: { type: String, default: "Unkown" },
  adress: { type: String, default: "Unkown" },
  loggedUser: { type: Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
