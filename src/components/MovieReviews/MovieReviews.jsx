import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

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
    <section className={css.reviewsSection}>
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review) => {
            return (
              <li className={css.reviewItem} key={review.id}>
                <h3 className={css.reviewAutor}>{review.author}</h3>
                <p className={css.reviewText}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h2>We don`t have any reviews about this film.</h2>
      )}
    </section>
  );
}
