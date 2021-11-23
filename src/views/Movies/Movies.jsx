import { useState, useEffect } from "react";
import * as movieShellAPI from "../../services/movieShelf-api";
import { useHistory, useLocation } from "react-router-dom";
import "./Movies.scss";
import ListMovie from "../../components/ListMovie/ListMovie";
import loader from "../../services/loader";
const Movies = () => {
  const [handlerMovie, setHandlerMovie] = useState("");
  const [listMovies, setListMovies] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [isLoader, setLoader] = useState(false);
  const saveList = new URLSearchParams(location.search).get(`query`); //the current state of the URL term

  useEffect(() => {
    if (saveList) {
      setLoader((isLoading) => !isLoading);
      movieShellAPI
        .fetchMovieBySearch(saveList, page)
        .then((response) => {
          if (response.total_pages > 0) {
            setListMovies(response);
            setHandlerMovie("");
          } else {
            setListMovies(null);
            setError(saveList);
          }
        })
        .finally(() => {
          setLoader((isLoading) => !isLoading);
        });
    }
  }, [saveList, page]);
  const onChangePage = (page) => {
    setPage(page);
  };
  const handlerName = (e) => {
    setHandlerMovie(e.currentTarget.value.toLowerCase());
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (handlerMovie.trim() === "") {
      return;
    }
    history.push({
      ...location,
      search: `query=${handlerMovie}`,
    });
  };
  //test
  return (
    <>
      <form onSubmit={handlerSubmit} className="formMovies">
        <input
          type="text"
          name="bar"
          value={handlerMovie}
          placeholder="Search movies"
          onChange={handlerName}
        />
        <button type="submit">Search</button>
      </form>
      {error && (
        <>
          <p>Text not found</p>
          <h1>{error}</h1>
        </>
      )}
      {listMovies && (
        <>
          {isLoader && loader()}
          <ListMovie
            movies={listMovies.results}
            currentPage={listMovies.page}
            count={listMovies.total_pages}
            onChangePage={onChangePage}
          />
        </>
      )}
    </>
  );
};
export default Movies;
