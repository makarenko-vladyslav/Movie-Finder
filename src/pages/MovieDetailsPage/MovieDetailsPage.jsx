import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";

import { getMoviesById, getMovieTrailer } from "../../movies-api";
import Modal from "../../components/ModalTrailer/ModalTrailer";
import bannerImg from "../../assets/banner-min.jpg";
import noPosterImg from "../../assets/no-poster.jpg";

import css from "./MovieDetailsPage.module.css";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaImdb } from "react-icons/fa";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movie, setMovie] = useState("");
  const [trailer, setTrailer] = useState("");
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

  async function playTrailer() {
    setModalIsOpen(true);

    const data = await getMovieTrailer(movieId);
    setTrailer(data[0].key);

    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <div>
        <Link to={backLinkRefURL.current}>Go back</Link>
      </div>

      {error && <p>There was an error loading the movie details.</p>}
      {movie && (
        <section className={css.section}>
          <span
            className={css.background}
            style={{
              backgroundImage: movie.backdrop_path
                ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), 
              url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                : `url(${bannerImg})`,
            }}
          ></span>

          <div className={css.detailWrapper}>
            <div className={css.leftWrapper}>
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

              <ul className={css.listInfo}>
                <li className={css.infoItem}>
                  Rating:
                  <span
                    className={
                      movie.vote_average && ratingColor(movie.vote_average)
                    }
                  >
                    <FaImdb />{" "}
                    {movie.vote_average != 0 && movie.vote_average.toFixed(1)}
                  </span>
                </li>

                <li className={css.infoItem}>
                  Grades:
                  <span className={css.accent}>
                    <AiFillLike className={css.icon} /> {movie.vote_count}
                  </span>
                </li>

                <li className={css.infoItem}>
                  Duration:
                  <span className={css.accent}>
                    <BiTime className={css.icon} /> {movie.runtime} m.
                  </span>
                </li>
              </ul>
            </div>

            <div className={css.rightWrapper}>
              <span className={css.release}>Release: {movie.release_date}</span>

              <h1 className={css.title}>{movie.title}</h1>
              <p className={css.losung}>{`"${movie.tagline}"`}</p>

              <ul className={css.genreList}>
                {movie.genres.map((genre) => (
                  <li className={css.genreItem} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>

              <p className={css.overview}>{movie.overview}</p>

              <button className={css.trailerBtn} onClick={playTrailer}>
                Trailer
              </button>
            </div>
          </div>

          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              onClose={closeModal}
              trailerUrl={trailer}
            />
          )}
        </section>
      )}

      <div className={css.navWrapper}>
        <ul className={css.navList}>
          <li>
            <NavLink className={css.navItem} to="cast">
              Actors
            </NavLink>
          </li>
          <li>
            <NavLink className={css.navItem} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>

        <Outlet />
      </div>
    </div>
  );
}
