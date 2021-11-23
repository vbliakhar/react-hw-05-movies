import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as movieShellAPI from "../../services/movieShelf-api";
import ImageError from "../ImageError/ImageError";
import PropTypes from "prop-types";
import loader from "../../services/loader";

const MovieCast = ({ movie }) => {
  const { moviesId } = useParams();
  const [actors, setActors] = useState(null);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    setLoader((isLoading) => !isLoading);
    movieShellAPI
      .fetchMovieByActors(moviesId)
      .then((response) => {
        setActors(response.cast);
      })
      .catch((error) => {
        console.log("My error");
      })
      .finally(() => {
        setLoader((isLoading) => !isLoading);
      });
  }, [moviesId]);
  return (
    <>
      {isLoader && loader()}
      {actors &&
        actors.map(({ profile_path, name, character, cast_id }) => {
          return (
            <li key={cast_id}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                  alt=""
                  width="150px"
                />
              ) : (
                <ImageError />
              )}

              <p>{name}</p>
              <p>Character: {character ? character : `not specified`}</p>
            </li>
          );
        })}
    </>
  );
};

MovieCast.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number.isRequired,
      profile_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default MovieCast;
