const express = require("express");
const router = express.Router();


router.get("/explore", (req, res, next) => {


  res.render("explore");
});

module.exports = router;