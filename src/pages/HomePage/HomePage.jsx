import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";

import css from "./HomePage.module.css";
import Error from "../../components/Error/Error";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTrendsMovies();
  }, []);

  async function fetchTrendsMovies() {
    if (movies.length == 0) {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <section className={css.body}>
      {error ? (
        <Error />
      ) : (
        <>
          {!loading && <h2 className={css.title}>Weekly trends</h2>}
          {movies && <MovieList movies={movies}></MovieList>}
          {loading && <Spinner></Spinner>}
        </>
      )}
    </section>
  );
}
