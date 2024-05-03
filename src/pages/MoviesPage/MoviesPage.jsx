import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, getPopularMovies } from "../../movies-api";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import LoadMore from "../../components/LoadMore/LoadMore";
import Spinner from "../../components/Spinner/Spinner";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [loadMore, setloadMore] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("title");
  const page = Number(searchParams.get("page")) || 1;

  const handleSearch = (value) => {
    setShouldFetch(true);
    setSearchParams({ title: value, page: 1 });
  };

  const handleLoadMore = () => {
    setShouldFetch(true);
    setSearchParams({ title: searchValue, page: page + 1 });
  };

  useEffect(() => {
    setShouldFetch(true);

    if (!searchValue) {
      fetchTrendsMovies();
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue && shouldFetch) {
      fetchMovies(searchValue, page);
    }
  }, [searchValue, page, shouldFetch]);

  async function fetchTrendsMovies() {
    try {
      setMovies([]);
      setLoading(true);
      setloadMore(false);

      const data = await getPopularMovies();

      setMovies(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setShouldFetch(false);
    }
  }

  async function fetchMovies(title, page) {
    try {
      setMovies([]);
      setLoading(true);
      setloadMore(false);
      const data = await searchMovies(title, page);
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      if (!data.total_pages) {
        return setError(true);
      }
      page >= data.total_pages ? setloadMore(false) : setloadMore(true);
      console.log(data.total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setShouldFetch(false);
    }
  }

  return (
    <section className={css.body}>
      <SearchBar onSubmit={handleSearch}></SearchBar>

      {!loading &&
        (searchValue ? (
          <h2 className={css.title}>Films by request: {searchValue}</h2>
        ) : (
          <h2 className={css.title}>Most popular</h2>
        ))}

      <MovieList movies={movies && movies}></MovieList>

      {loading && <Spinner></Spinner>}

      {loadMore && <LoadMore onClick={handleLoadMore}></LoadMore>}

      {/* {loadMore && <ScrollToTop />} */}
    </section>
  );
}
