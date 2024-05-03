import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import posterImg from "../../assets/no-poster.jpg";

import css from "./MovieList.module.css";

const posterPath = "https://image.tmdb.org/t/p/w500";

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

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <>
      <ul className={css.moviesList}>
        {movies.map((item) => (
          <li className={css.movieItem} key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              <div className={css.overlay}>
                <img
                  className={css.movieImage}
                  src={
                    item.poster_path ? posterPath + item.poster_path : posterImg
                  }
                  alt={item.title}
                  width="225px"
                  height="300px"
                />
                <span
                  className={
                    item.vote_average && ratingColor(item.vote_average)
                  }
                >
                  {item.vote_average != 0 &&
                    item.vote_average.toFixed(1)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
