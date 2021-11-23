import React from "react";
import ImageError from "../ImageError/ImageError";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PaginationBox from "../../hoc/PaginationBox/PaginationBox";
import myScroll from "../../services/myScroll";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ListMovie = ({ movies, currentPage, count, onChangePage }) => {
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => myScroll(), [movies]);
  return (
    <>
      <ul className="blockImg">
        {movies.map(
          (movie) =>
            movie.title && (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${url}${
                      location.pathname === "/" ? "movies/" : "/"
                    }${movie.id}`,
                    state: {
                      form: {
                        location,
                        label: "Home page",
                      },
                    },
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      width="186"
                      height="278.984"
                    />
                  ) : (
                    <ImageError />
                  )}

                  {/* {movie.title} */}
                </Link>
              </li>
            )
        )}
      </ul>
      <PaginationBox
        currentPage={currentPage}
        count={count}
        onChangePage={onChangePage}
      />
    </>
  );
};
ListMovie.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
    })
  ),
};
export default ListMovie;
