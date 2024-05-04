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

import css from "./MovieDetailsPage.module.css";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import clsx from "clsx";

function ratingColor(rating) {
  return clsx(
    css.rating,
    rating >= 7 && css.ratingGreen,
    rating > 5 && rating < 7 && css.ratingYellow,
    rating >= 3 && rating <= 5 && css.ratingOrange,
    rating < 3 && css.ratingRed,
    !rating && css.ratingNull
  );
}

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
        <section className={css.filmDetailWrapper}>
          <div
            className={css.background}
            style={{
              backgroundImage: movie.backdrop_path
                ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), 
              url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                : `url(${bannerImg})`,
            }}
          ></div>

          <img
            className={css.poster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : `${noPosterImg}`
            }
            alt={`${movie.name} photo`}
            height="250px"
            width="175px"
          />
          <div className={css.infoWrapper}>
            <span className={css.release}>Release: {movie.release_date}</span>

            <h1 className={css.title}>{movie.title}</h1>
            <p className={css.losung}>{movie.tagline}</p>

            <ul className={css.genreList}>
              {movie.genres.map((genre) => (
                <li className={css.genreItem} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>

            <ul className={css.listInfo}>
              <li className={css.infoItem}>
                Rating:{" "}
                <span
                  className={
                    movie.vote_average && ratingColor(movie.vote_average)
                  }
                >
                  {movie.vote_average != 0 && movie.vote_average.toFixed(1)}
                </span>
              </li>

              <li className={css.infoItem}>
                Grades:{" "}
                <span className={css.accent}>
                  <AiFillLike className={css.icon} />
                  {movie.vote_count}
                </span>
              </li>

              <li className={css.infoItem}>
                Duration:{" "}
                <span className={css.accent}>
                  <BiTime className={css.icon} />
                  {movie.runtime} m.
                </span>
              </li>
            </ul>

            <p className={css.overview}>{movie.overview}</p>
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
