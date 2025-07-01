const express = require("express");
const path = require("path");
const router = express.Router();

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});
router.get("/newpage(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "newpage.html"));
});
router.get("/oldpage(.html)?", (req, res) => {
  res.redirect(301, "newpage.html");
});
module.exports = router;
