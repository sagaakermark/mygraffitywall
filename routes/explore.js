const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/Post-form");

//  GET /explore
router.get("/", (req, res, next) => {
  console.log(req.query.search);
  Post.find({ approved: true })
    .then(data => {
      res.render("explore", { posts: data, user: req.user });
    })
    .catch(err => console.log(err));
  // gets the wall collection
  // render the explore view with the wall data
});

router.get("/search", (req, res) => {
  Post.find().then(allPosts => {
    let filteredPost = allPosts.filter(el =>
      el.area.toLowerCase().startsWith(req.query.search.toLowerCase())
    );
    res.render("explore", { posts: filteredPost, user: req.user });
  });
  //Post.find({area: search}).then(...).catch(err => console.log(err))
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

// creates the post collection
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
  Post.find({ loggedUser: req.user._id })
    .populate("loggedUser")
    .then(posts => {
      console.log(posts);
      res.render("profile", { posts, user: req.user });
    });
});

// delete post in your /profile
router.get("/delete/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(() =>
    res.redirect("/explore/profile")
  );
});

// /explore/postForm
router.get("/postForm", (req, res, next) => {
  // gets the wall collection
  // render the explore view with the wall data
  res.render("postForm");
});

module.exports = router;
