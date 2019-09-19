const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let user = req.session.passport.user;
  res.render("index", { user });
});

module.exports = router;
