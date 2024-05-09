import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom";

import defPhoto from "../../assets/def-photo.svg";
import css from "./MovieCast.module.css";

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

  return actors.length > 0 ? (
    <section className={css.actorsSection}>
      <ul className={css.actorsList}>
        {actors.map((actor) => {
          return (
            <li className={css.actorItem} key={actor.id}>
              <img
                className={css.actorPhoto}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defPhoto
                }
                alt={`${actor.name} photo`}
                height="250px"
                width="175px"
              />

              <div className={css.actorInfoWrapper}>
                <h3 className={css.actorName}>{actor.name}</h3>
                <h4 className={css.actorCharacter}>{actor.character}</h4>

                <p className={css.actorPopularity}>
                  Popularity: <span>{actor.popularity.toFixed(1)}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  ) : (
    <h2>We don`t know actors from this film.</h2>
  );
}
