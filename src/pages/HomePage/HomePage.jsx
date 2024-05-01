import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTrendsMovies();
  }, []);

  async function fetchTrendsMovies() {
    if (movies.length == 0) {
      const data = await getTrendingMovies();
      setMovies(data);
    }
  }

  return (
    <div>
      <h3>Home page </h3>
      <MovieList movies={movies && movies}></MovieList>;
    </div>
  );
}
