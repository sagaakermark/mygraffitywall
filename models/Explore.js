//models/Explore.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallSchema = new Schema({
  img: String,
  title: String,
  artist: { type: String, default: "Unkown" },
  about: {type: String, default: "No information provided. If you are familiar with the work or artist,  " },
  area: String,
  address: String
});

const Explore = mongoose.model("Explore", wallSchema);

module.exports = Explore;
