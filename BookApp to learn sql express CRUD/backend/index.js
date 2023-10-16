import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/connection.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.get("/", (req, res, next) => {
  res.json("hello from backend");
});

app.get("/books", (req, res, next) => {
  const q = "SELECT * FROM BOOKS";
  dbConnection.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.use(express.json()); // to get data

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  dbConnection.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  dbConnection.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`book no ${bookId} is deleted `);
  });
});
app.use(express.json());
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  console.log("boduy", values);

  dbConnection.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`listning to port http://localhost:${port}`);
});
