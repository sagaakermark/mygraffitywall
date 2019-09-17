const express = require("express");
const router = express.Router();
const Post = require("../models/Post-form");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("we have a user logged in");
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

function isAdmin(req, res, next) {
  if (req.user.role === "ADMIN") {
    console.log("the user is an admin");
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

// GET /admin/posts
router.get("/posts", ensureAuthenticated, isAdmin, (req, res, next) => {
  Post.find({ approved: false })
    .then(posts => {
      res.render("admin", { posts: posts });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/posts/:postid/approve", (req, res, next) => {
  const postId = req.params.postid;

  Post.findOneAndUpdate({ _id: postId }, { $set: { approved: true } }).then(
    posts => {
      res.redirect("/admin/posts");
    }
  );
});
module.exports = router;
