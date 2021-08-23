import React, { useState, useEffect } from "react";
import "../stylesheet/Banner.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff4335167329d004b789076a7c793966&page=1";

function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setBanner(
          data.results[Math.floor(Math.random() * data.results.length)]
        );
      });
  }, []);

  const trucate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      <div
        className="banner_cls"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_content">
          <h1 className="banner_title">
            {banner?.title || banner?.name || banner?.original_name}
          </h1>

          <h1 className="banner_description">
            {trucate(banner?.overview, 150)}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Banner;
