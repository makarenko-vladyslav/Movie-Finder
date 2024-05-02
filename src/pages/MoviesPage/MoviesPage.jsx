import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, getPopularMovies } from "../../movies-api";

import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import LoadMore from "../../components/LoadMore/LoadMore";
import Spinner from "../../components/Spinner/Spinner";

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
      setMovies((prevMovies) => [...prevMovies, ...data]);
      if (!data.total_pages) {
        return setError(true);
      }
      page >= data.total_pages ? setloadMore(false) : setloadMore(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setShouldFetch(false);
      setloadMore(true);
    }
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearch}></SearchBar>

      {searchValue ? <h2>Films by request: {searchValue}</h2> : <h2>Most popular</h2>}

      {loading && <Spinner></Spinner>}

      <MovieList movies={movies && movies}></MovieList>

      {loadMore && <LoadMore onClick={handleLoadMore}></LoadMore>}

      {/* {loadMore && <ScrollToTop />} */}
    </div>
  );
}
