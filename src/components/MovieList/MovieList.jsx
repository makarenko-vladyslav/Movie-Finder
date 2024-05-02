import { Link, useLocation } from "react-router-dom";
import posterImg from "../../assets/no-poster.jpg";

import css from "./MovieList.module.css";

const posterPath = "https://image.tmdb.org/t/p/w500";

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
                <p>Rating: {item.vote_average}</p>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
