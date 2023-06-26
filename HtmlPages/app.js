const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

//path filtering
app.use("/admin", adminRoutes);

app.use(shopRoutes);

//404 page
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname, "views", "404.html");
});

app.listen(port);
