import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./index.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movie, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const data = async () => {
      let url = await axios.get(fetchURL);
      setMovies(url.data.results);
      return url;
    };
    data();
  }, [fetchURL]);

  // console.log(movie);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const playMovie = (getMovies) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        getMovies?.name || getMovies?.title || getMovies?.original_name || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log("Trailer Not Found");
        });
    }
  };

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="movie_Containers">
          {movie.map((getMovies) => {
            return (
              <>
                <img
                  key={getMovies.id}
                  prop={getMovies.id}
                  onClick={() => playMovie(getMovies)}
                  src={`${baseURL}${
                    isLargeRow ? getMovies.poster_path : getMovies.backdrop_path
                  }`}
                  alt={getMovies.name}
                  className={`movies ${isLargeRow && "isLarge"}`}
                />
              </>
            );
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
};

export default Row;
