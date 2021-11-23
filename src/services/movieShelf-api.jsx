const BASE_URL = "https://api.themoviedb.org/3/";
const myKey = "18f3850d2e2b26a030fc97b3b8448670";

async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("not found"));
}
export function fetchMovies(page) {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/all/day?api_key=${myKey}&page=${page}`,
    {
      params: 3,
    }
  );
}
export function fetchMovieById(moviesId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${moviesId}?api_key=${myKey}`
  );
}
export function fetchMovieByActors(filmId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${filmId}/credits?api_key=${myKey}&language=en-US`
  );
}
export function fetchMovieByReviews(filmId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${filmId}/reviews?api_key=${myKey}&language=en-US&page=1`
  );
}
export function fetchMovieBySearch(searchFilm, page) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${myKey}&query=${searchFilm}&language=en-US&page=1&include_adult=false&page=${page}`
  );
}
