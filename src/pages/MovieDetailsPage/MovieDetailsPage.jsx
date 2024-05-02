import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

import { getMoviesById } from "../../movies-api";
import bannerImg from "../../assets/banner-min.jpg";
import noPosterImg from "../../assets/no-poster.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const backLinkRefURL = useRef(location.state ?? "/movies");

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [movieId]);

  async function fetchMovieDetails() {
    try {
      const data = await getMoviesById(movieId);

      setMovie(data);
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div>
      <div>
        <Link to={backLinkRefURL.current}>Go back</Link>
      </div>

      {error && <p>There was an error loading the movie details.</p>}
      {movie && (
        // <section className={css.section}

        <section
          style={{
            background: movie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`
              : `url(${bannerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : `${noPosterImg}`
            }
            alt={`${movie.name} photo`}
            height="250px"
            width="175px"
          />
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.tagline}</p>

            <p>{movie.overview}</p>
            <p>Release: {movie.release_date}</p>
          </div>
        </section>
      )}

      <div>
        <ul>
          <li>
            <NavLink to="cast">Actors</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>

        <Outlet />
      </div>
    </div>
  );
}
