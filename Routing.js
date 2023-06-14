const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/temp", (req, res) => {
  res.json([
    {
      id: 1,
      name: "vinod",
    },
    {
      id: 2,
      name: "vinod",
    },
  ]);
});

app.listen(port, () => {
  console.log(`listning to the port ${port}`);
});
