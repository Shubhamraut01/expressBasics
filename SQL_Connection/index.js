const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
// db.js
const mysql = require("mysql2");
const connection = require("./db");

app.use("/api", routes);
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/first", (req, res) => {
  res.send("Hello friends!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
