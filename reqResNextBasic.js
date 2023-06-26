const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const port = 3000;
//before routing middleware
app.use(bodyParser.urlencoded({ extended: false }));
// extended : false is written because bodyParsere is deprecated
//end
app.use("/add-product", (req, res, next) => {
  console.log("this always runs");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

// path for "/" should come last always
app.use("/", (req, res, next) => {
  res.send("home page");
});

app.listen(port);
