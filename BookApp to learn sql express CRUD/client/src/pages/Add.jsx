import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8800/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    navigate("/");
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button type="submit" className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

export default Add;
