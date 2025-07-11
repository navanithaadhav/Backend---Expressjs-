const express = require("express");
const path = require("path");
const router = express.Router();
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "subdir", "index.html"));
});
router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "subdir", "test.html"));
});
module.exports = router;
