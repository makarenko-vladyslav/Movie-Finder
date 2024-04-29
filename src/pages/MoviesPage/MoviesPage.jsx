import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api";

import SearchBar from "../../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies(newTopic) {
      setMovies([]);
      try {
        setLoading(true);
        const data = await searchMovies(newTopic);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies(title);
  }, [title]);

  return (
    <div>
      <p>Movies page</p>
      <SearchBar onSubmit={setTitle}></SearchBar>
    </div>
  );
}
