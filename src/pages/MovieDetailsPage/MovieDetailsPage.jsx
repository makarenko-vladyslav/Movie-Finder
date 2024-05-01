import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import { getMoviesById } from "../../movies-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const backLinkRefURL = useRef(location.state);

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
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
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

        < Outlet/>
      </div>
    </div>
  );
}
