const express = require("express");
const router = express.Router();

const Post = require("../models/Post-form");

//  GET /explore
router.get("/", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  res.render("explore");
});

//  POST /explore
router.post("/", (req, res, next) => {
  let { title, artist, description, area, adress, postBy } = req.body;
  Post.create({ title, artist, description, area, adress, postBy }).then(() => {
    res.send("created");
  });
  // gets the wall collection
  // render the explore view with the wall data
});

// /explore/post-form
router.get("/postForm", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  res.render("postForm");
});

module.exports = router;
