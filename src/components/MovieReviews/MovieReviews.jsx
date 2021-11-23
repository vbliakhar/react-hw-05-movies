import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as movieShellAPI from "../../services/movieShelf-api";
import loader from "../../services/loader";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [reviews, setReview] = useState(null);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    setLoader((isLoading) => !isLoading);
    movieShellAPI
      .fetchMovieByReviews(moviesId)
      .then((response) => {
        response.total_pages > 0
          ? setReview(response.results)
          : setReview(null);
      })
      .finally(() => {
        setLoader((isLoading) => !isLoading);
      });
  }, [moviesId]);

  return (
    <>
      {isLoader && loader()}
      {reviews ? (
        reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};

export default MovieReviews;
