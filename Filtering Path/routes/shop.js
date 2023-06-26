const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  res.send("<h1>home page</h1>");
});

module.exports = router;
