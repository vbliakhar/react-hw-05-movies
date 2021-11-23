// import PageHeading from "../PageHeading/PageHeading";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import * as movieShellAPI from "../../services/movieShelf-api";
import ImageError from "../ImageError/ImageError";
import style from "./MovieDetails.module.scss";

const MovieCast = lazy(() =>
  import("../MovieCast/MovieCast.jsx" /* webpackChunkName: "MovieCast"*/)
);
const MovieReviews = lazy(() =>
  import(
    "../MovieReviews/MovieReviews.jsx" /* webpackChunkName: "MovieReviews"*/
  )
);

const MovieDetails = () => {
  const history = useHistory();
  const location = useLocation();

  const { moviesId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieShellAPI.fetchMovieById(moviesId).then((response) => {
      setMovie(response);
    });
  }, [moviesId]);
  const onGoBack = () => {
    if (location && location.state && location.state.form) {
      history.push(location.state.form.location);
      return;
    }
    history.push("/");
  };

  return (
    <>
      {/* <PageHeading text={`test ${moviesId}`} /> */}
      {movie && (
        <>
          <button className={style.button} type="button" onClick={onGoBack}>
            {location?.state?.form?.label ?? "Go back"}
          </button>
          <hr />
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt=" "
              width="200px"
            />
          ) : (
            <ImageError />
          )}
          <h3>Genres: </h3>
          {movie.genres &&
            movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
          <h3>{movie.title}</h3>
          <p>Author: {movie.title}</p>
          <p>Overview: {movie.overview}</p>
          <p>
            tmbd: <span>{movie.vote_average}</span>
          </p>
          <hr />
          <p>Additional information</p>
          <ul>
            <li key={moviesId}>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    form: {
                      location: location?.state?.form?.location,
                      label: location?.state?.form?.label ?? "Go back",
                    },
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    form: {
                      location: location?.state?.form?.location,
                      label: location?.state?.form?.label ?? "Go back",
                    },
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <hr />
      <Suspense fallback={<h1>Loader ...</h1>}>
        <Route path={`${path}/cast`} exact>
          {movie && <MovieCast />}
        </Route>

        <Route path={`${path}/reviews`} exact>
          {movie && <MovieReviews />}
        </Route>
      </Suspense>
    </>
  );
};

export default MovieDetails;
