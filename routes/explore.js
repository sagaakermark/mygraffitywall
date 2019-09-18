const express = require("express");
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require("../models/Post-form");

//  GET /explore
router.get("/", (req, res, next) => {
  Post.find({ approved: true })
    .then(data => {
      console.log(data);
      res.render("explore", { posts: data });
    })
    .catch(err => console.log(err));
  // gets the wall collection
  // render the explore view with the wall data
});

//  POST /explore
// creates the post collection
// render the explore view with the post collection
router.post("/", (req, res, next) => {
  let { title, artist, description, area, adress, postBy } = req.body;
  Post.create({ title, artist, description, area, adress, postBy })
    .then(post => {
      console.log(`Success! Post was added to the database.`);
      res.redirect("/explore");
    })
    .catch(err => {
      console.log("Error while adding a book to the DB");
      next(err);
    });
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

// /explore/postForm
router.get("/postForm", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  res.render("postForm");
});


module.exports = router;