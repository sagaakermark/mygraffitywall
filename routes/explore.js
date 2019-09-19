const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/Post-form");

//  GET /explore
router.get("/", (req, res, next) => {
  console.log(req.query.search);
  Post.find({ approved: true })
    .then(data => {
      console.log(data);
      res.render("explore", { posts: data });
    })
    .catch(err => console.log(err));
  // gets the wall collection
  // render the explore view with the wall data
});

const loginCheck = () => {
  return (req, res, next) => {
    // if (req.user)
    if (req.user) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/auth/login");
    }
  };
};
//  POST /explore
// creates the post collection
// render the explore view with the post collection
router.post(
  "/",
  loginCheck(),
  uploadCloud.single("photo"),
  (req, res, next) => {
    let { title, artist, description, area, adress } = req.body;
    Post.create({
      title,
      artist,
      description,
      area,
      adress,
      loggedUser: req.user._id,
      img: req.file.url
    })
      .then(post => {
        console.log(`Success! Post was added to the database.`);
        res.redirect("/explore");
      })
      .catch(err => {
        console.log("Error");
        next(err);
      });
  }
);

// match the postId with the userId and display the posts in users profile

router.get("/profile", (req, res) => {
  //[{ $match: { user: Post.postID } }]
  Post.find({ loggedUser: req.user._id })
    .populate("loggedUser")
    .then(posts => {
      console.log(posts);
      res.render("profile", { posts });
    });
});

// /explore/postForm
router.get("/postForm", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  res.render("postForm");
});

module.exports = router;
