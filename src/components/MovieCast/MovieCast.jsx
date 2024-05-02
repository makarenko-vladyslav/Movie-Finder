import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom";

import defPhoto from "../../assets/def-photo.svg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function getActors() {
      const data = await getMovieCast(movieId);

      const onlyActors = data.cast.filter(
        (actor) => actor.known_for_department === "Acting"
      );

      onlyActors.length > 0 && setActors(onlyActors);
    }

    getActors();
  }, [movieId]);

  return (
    <div>
      <ul>
        {actors.map((actor) => {
          return (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defPhoto
                }
                alt={`${actor.name} photo`}
                height="250px"
                width="175px"
              />

              <h4>{actor.name}</h4>
              <p>{actor.character}</p>

              <p>
                Popularity: <span>{actor.popularity}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
