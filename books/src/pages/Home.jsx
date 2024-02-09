import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    updateResult(value);
  };

  const updateResult = (value) => {
    setResult(value === "" ? "" : filteredData.length > 0 ? "Show the results" : "No results found");
  };

  const filteredData = books.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mainpage">
      <div className="header">
        <span className="logo">Ocean of Books</span> {}
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
      </div>
      <input
        id="searchbox"
        type="text"
        placeholder="Search your books"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <p className="results">{result}</p>
      <div className="Books">
        {filteredData.map((item) => (
          <div key={item.id}>
            <img src={item.imageLinks.thumbnail} alt="" />
            <h4>{item.title}</h4>
            <p>
              <span>
                <h3>{item.averageRating ? `${item.averageRating}⭐` : "UR"}</h3>
                <h3 className="cost">FREE</h3>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
