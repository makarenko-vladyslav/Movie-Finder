import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const data = await getMovieReviews(movieId);

      data.total_results > 0 && setReviews(data.results);
    }

    getReviews();
  }, [movieId]);

  return (
    <div>

      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have any reviews about this film.</p>
      )}
    </div>
  );
}
