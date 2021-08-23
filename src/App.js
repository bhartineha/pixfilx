import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";
import MovieListHeading from "./components/MovieListHeading";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import Banner from "./components/Banner";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff4335167329d004b789076a7c793966&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ff4335167329d004b789076a7c793966&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      console.log(trailerUrl + "trailer url");
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || "")
        .then((url) => {
          console.log(url + " url");
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  return (
    <>
      <header>
        <MovieListHeading heading="PixFlix" />
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="row d-flex align-items-center mb-4">
        <Banner />
      </div>
      <div className="row d-flex align-items-center">
        <h2 className="first-row-mv"> What's Popular</h2>
      </div>
      <div className="movie-container">
        <Movie
          movies={movies}
          handleClick={handleClick}
          handFavoritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className="tralier_cls">
        <h3 className="header_cls" id="trailer_heading"></h3>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      <div className="row d-flex align-items-center">
        <h2 className="header_cls"> Favourites Watchlist</h2>
      </div>
      {/* Remove favourite movie */}
      <div className="movie-container">
        <Movie
          movies={favourites}
          handleClick={handleClick}
          handFavoritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
      <footer>
        <div className="footer_cls">
          <span> @Neha Copyright 2021</span>
        </div>
      </footer>
    </>
  );
}

export default App;
