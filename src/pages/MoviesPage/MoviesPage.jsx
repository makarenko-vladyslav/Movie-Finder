import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api";

import SearchBar from "../../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchMovies() {
  try {
    setLoading(true);
    const data = await searchMovies(); // Викликайте вашу функцію для пошуку фільмів
    setMovies(data);
  } catch (error) {
    setError(true);
  } finally {
    setLoading(false);
  }
}

  const handleMovies = (newTopic) => {
    setMovies([]);
    // Викликайте функцію fetchMovies() при кліку на кнопку пошуку
    fetchMovies();
  };

  return (
    <div>
      <p>Movies page</p>
      <SearchBar onSubmit={handleMovies}></SearchBar>
    </div>
  );
}
