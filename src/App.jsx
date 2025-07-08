import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editBook, setEditBook] = useState({ name: "", author: "", price: "" });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  const addBook = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputAuthor.trim() || !inputPrice.trim()) return;

    setBooks([
      ...books,
      {
        name: inputName,
        author: inputAuthor,
        price: parseFloat(inputPrice).toFixed(2),
        time: getCurrentTime(),
      },
    ]);
    setInputName("");
    setInputAuthor("");
    setInputPrice("");
  };

  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditBook({
      name: books[index].name,
      author: books[index].author,
      price: books[index].price,
    });
  };

  const saveEdit = (index) => {
    if (!editBook.name.trim() || !editBook.author.trim() || !editBook.price.trim())
      return;

    const updated = books.map((book, i) =>
      i === index
        ? { ...book, name: editBook.name, author: editBook.author, price: parseFloat(editBook.price).toFixed(2) }
        : book
    );
    setBooks(updated);
    setEditIndex(null);
    setEditBook({ name: "", author: "", price: "" });
  };

  return (
    <div className="app-container">
      <h1>App-Book</h1>
      <form onSubmit={addBook} className="add-form">
        <input
          type="text"
          placeholder="Book name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={inputAuthor}
          onChange={(e) => setInputAuthor(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      <table className="book-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nombre del libro</th>
            <th>Autor</th>
            <th>Precio ($)</th>
            <th>Fecha de inclusión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No hay libros añadidos.
              </td>
            </tr>
          )}
          {books.map((book, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              {editIndex === idx ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editBook.name}
                      onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editBook.author}
                      onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={editBook.price}
                      onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
                    />
                  </td>
                  <td>{book.time}</td>
                  <td>
                    <button onClick={() => saveEdit(idx)}>Save</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>{book.time}</td>
                  <td>
                    <button onClick={() => startEdit(idx)}>Edit</button>
                    <button onClick={() => deleteBook(idx)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
