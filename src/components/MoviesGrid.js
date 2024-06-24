import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles.css';

export default function MoviesGrid() {
  // Creating a new state
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [genre, setGenre] = useState('All Genres');
  const [rating, setRating] = useState('All');

  useEffect(() => {
    fetch('movies.json')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleGenreChange(e) {
    setGenre(e.target.value);
  }

  function handleRatingChange(e) {
    setRating(e.target.value);
  }

  const matchesGenre = (movie, genre) => {
    return (
      genre === 'All Genres' ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case 'All':
        return true;

      case 'Good':
        return movie.rating >= 8;

      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;

      case 'Bad':
        return movie.rating < 5;

      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
}
