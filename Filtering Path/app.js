const bodyParser = require("body-parser");
const express = require("express");

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
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port);
