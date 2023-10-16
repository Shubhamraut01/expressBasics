import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8800/books", {
          method: "GET", // This is the default method, so you can omit it.
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:8800/books/" + id, {
        method: "DELETE", // This is the default method, so you can omit it.
      });
      window.location.reload();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(books);
  return (
    <div>
      <h1>Shubham Book Store</h1>
      <div className="books">
        {books.map((data, index) => {
          return (
            <div key={index} className="book">
              <img src={data.cover} alt={data.title} />

              <b>{data.id}</b>
              <p>{data.title}</p>
              <p>{data.description}</p>
              <p>{data.price}</p>
              <button className="delete" onClick={() => handleDelete(data.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${data.id}`}>Update</Link>
              </button>
            </div>
          );
        })}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
}

export default Books;
