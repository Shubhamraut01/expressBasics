const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

const staticPath = path.join(__dirname, "../public");

// console.log(path.join(__dirname, "public"));

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("about page");
});
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
