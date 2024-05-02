import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTrendsMovies();
  }, []);

  async function fetchTrendsMovies() {
    setLoading(true)

    if (movies.length == 0) {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);

      }
    }
  }

  return (
    <div>
      <h2>Weekly trends</h2>
      {movies && <MovieList movies={movies && movies}></MovieList>}
      {loading && <Spinner></Spinner>}
    </div>
  );
}
