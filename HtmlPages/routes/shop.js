const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));

  //__dirname reffers to path of current project
});

module.exports = router;
