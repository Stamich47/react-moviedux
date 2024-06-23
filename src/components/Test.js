import React, { useState, useEffect } from 'react';
import '../styles.css';

// Tip 1: Remember to use the useState hook to create your state.
// Tip 2: Initialize your state with a list of 3(!) book titles as strings.

export default function Test() {
  const bookTitles = [
    { id: 1, name: 'Birrium Wirrium and the Great Potato' },
    { id: 2, name: 'The Adventures of Deez' },
    { id: 3, name: 'Building Stuff: The Complete Edition' },
  ];
  // Tip 3: Define your state here using useState.
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(bookTitles);
  }, []);

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
