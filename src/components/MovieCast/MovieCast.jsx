import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    console.log(actors);
  }, [actors]);

  return <div>Movie actors</div>;
}
