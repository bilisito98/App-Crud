import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer.jsx";

function StarRating({ rating, setRating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: "inline-block", marginBottom: "12px" }}>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffb400" : "#ccc",
            fontSize: "24px",
            marginRight: 4,
          }}
          onClick={() => setRating(star)}
          role="button"
          aria-label={`${star} estrellas`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setRating(star);
          }}
        >★</span>
      ))}
    </div>
  );
}

function App() {

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [inputName, setInputName] = useState(() => localStorage.getItem("inputName") || "");
  const [inputAuthor, setInputAuthor] = useState(() => localStorage.getItem("inputAuthor") || "");
  const [inputPrice, setInputPrice] = useState(() => localStorage.getItem("inputPrice") || "");
  const [rating, setRating] = useState(() => Number(localStorage.getItem("rating")) || 0);

  const [editIndex, setEditIndex] = useState(null);
  const [editBook, setEditBook] = useState({ name: "", author: "", price: "", rating: 0 });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };


  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);


  useEffect(() => {
    localStorage.setItem("inputName", inputName);
  }, [inputName]);

  useEffect(() => {
    localStorage.setItem("inputAuthor", inputAuthor);
  }, [inputAuthor]);

  useEffect(() => {
    localStorage.setItem("inputPrice", inputPrice);
  }, [inputPrice]);

  useEffect(() => {
    localStorage.setItem("rating", rating);
  }, [rating]);

  const addBook = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputAuthor.trim() || !inputPrice.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (isNaN(inputPrice) || Number(inputPrice) <= 0) {
      alert("Precio debe ser un número positivo.");
      return;
    }
    if (rating === 0) {
      alert("Por favor selecciona una calificación con estrellas.");
      return;
    }

    setBooks([
      ...books,
      {
        name: inputName,
        author: inputAuthor,
        price: Number(inputPrice).toFixed(2),
        time: getCurrentTime(),
        rating,
      },
    ]);
    setInputName("");
    setInputAuthor("");
    setInputPrice("");
    setRating(0);

    // Limpiar los datos guardados en localStorage al agregar
    localStorage.removeItem("inputName");
    localStorage.removeItem("inputAuthor");
    localStorage.removeItem("inputPrice");
    localStorage.removeItem("rating");
  };

  const deleteBook = (index) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      setBooks(books.filter((_, i) => i !== index));
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditBook({
      name: books[index].name,
      author: books[index].author,
      price: books[index].price,
      rating: books[index].rating,
    });
  };

  const saveEdit = (index) => {
    if (!editBook.name.trim() || !editBook.author.trim() || !editBook.price.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (isNaN(editBook.price) || Number(editBook.price) <= 0) {
      alert("Precio debe ser un número positivo.");
      return;
    }
    if (editBook.rating === 0) {
      alert("Por favor selecciona una calificación con estrellas.");
      return;
    }

    const updated = books.map((book, i) =>
      i === index
        ? {
            ...book,
            name: editBook.name,
            author: editBook.author,
            price: Number(editBook.price).toFixed(2),
            rating: editBook.rating,
          }
        : book
    );
    setBooks(updated);
    setEditIndex(null);
    setEditBook({ name: "", author: "", price: "", rating: 0 });
  };

  return (
    <div className="app-container">
      <h1>App CRUD Libros</h1>
      <form onSubmit={addBook} className="add-form" noValidate>
        <input
          type="text"
          placeholder="Nombre del libro"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={inputAuthor}
          onChange={(e) => setInputAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
          required
          min="0.01"
        />

        <StarRating rating={rating} setRating={setRating} />
        <button type="submit">Agregar Libro</button>
      </form>

      <table className="book-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nombre del libro</th>
            <th>Autor</th>
            <th>Precio ($)</th>
            <th>Calificación</th>
            <th>Fecha de inclusión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No hay libros añadidos.
              </td>
            </tr>
          ) : (
            books.map((book, idx) => (
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
                    <td>
                      <StarRating rating={editBook.rating} setRating={(r) => setEditBook({ ...editBook, rating: r })} />
                    </td>
                    <td>{books[idx].time}</td>
                    <td>
                      <button onClick={() => saveEdit(idx)}>Guardar</button>
                      <button onClick={() => setEditIndex(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{ color: star <= book.rating ? "#ffb400" : "#ccc", fontSize: "18px" }}
                        >
                          ★
                        </span>
                      ))}
                    </td>
                    <td>{book.time}</td>
                    <td>
                      <button onClick={() => startEdit(idx)}>Editar</button>
                      <button onClick={() => deleteBook(idx)}>Eliminar</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Footer />
    </div>
  );
}

export default App;
