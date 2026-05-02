import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Borrowed' },
    { id: 3, title: '1984', author: 'George Orwell', status: 'Available' }
  ]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    
    const newBook = {
      id: Date.now(),
      title,
      author,
      status: 'Available'
    };

    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const toggleStatus = (id) => {
    setBooks(books.map(book => {
      if (book.id === id) {
        return {
          ...book,
          status: book.status === 'Available' ? 'Borrowed' : 'Available'
        };
      }
      return book;
    }));
  };

  return (
    <div className="library-container">
      <header className="library-header">
        <h1>📚 My Digital Library</h1>
        <p>Manage your collection, add new entries, and track borrowing status.</p>
      </header>

      <main className="library-content">
        {/* Form to add a new book */}
        <section className="form-section">
          <h2>Add New Book</h2>
          <form onSubmit={addBook} className="book-form">
            <input 
              type="text" 
              placeholder="Book Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Author Name" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
            />
            <button type="submit">Add to Collection</button>
          </form>
        </section>

        {/* Dynamic Books List */}
        <section className="books-section">
          <h2>Available Collection ({books.length})</h2>
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className={`book-card ${book.status.toLowerCase()}`}>
                <h3>{book.title}</h3>
                <p className="author">By: {book.author}</p>
                <p className={`status-badge ${book.status.toLowerCase()}`}>{book.status}</p>
                <div className="card-actions">
                  <button onClick={() => toggleStatus(book.id)} className="status-btn">
                    Mark as {book.status === 'Available' ? 'Borrowed' : 'Available'}
                  </button>
                  <button onClick={() => removeBook(book.id)} className="delete-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;