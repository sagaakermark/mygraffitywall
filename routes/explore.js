const express = require("express");
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require("../models/Post-form");

//  GET /explore
router.get("/", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  // ?????
  Picture.find((err, pictures) => {
    res.render("explore", {
      pictures
    })
  })
});

//  POST /explore
router.post("/", uploadCloud.single("photo"), (req, res, next) => {
  console.log(req.body)
  let {
    title,
    artist,
    description,
    area,
    adress,
    postBy
  } = req.body;
  Post.create({
    title,
    artist,
    description,
    area,
    adress,
    postBy,
    img: req.file.url
  }).then(() => {
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