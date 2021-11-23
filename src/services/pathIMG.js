import noPhoto from "../components/ImageError/ImageError";

export default function pathIMG(path, size = "w342") {
  if (!path) return noPhoto;
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}
