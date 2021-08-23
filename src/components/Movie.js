import React from "react";
import "../stylesheet/Movie.css";

const IMG_API = "https://image.tmdb.org/t/p/original/";

const Movie = ({
  title,
  movies,
  poster_path,
  favouriteComponent,
  handFavoritesClick,
  handleClick,
}) => {
  const FavouriteComponent = favouriteComponent;

  return (
    <>
      {movies.map((movie) => (
        <div className="movie_cls">
          <img
            className="img_movie"
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={IMG_API + movie.poster_path}
            alt={movie.title}
          />
          <div className="option_cls" onClick={() => handleClick(movie)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-play"
                viewBox="0 0 16 16"
              >
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
              </svg>
          </div>
          <div onClick={() => handFavoritesClick(movie)} className="movie_info">
            <h3 className="title_cls">{movie.title}</h3>
            <br />
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default Movie;
