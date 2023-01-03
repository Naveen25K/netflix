import React, { useEffect, useState } from 'react';
import axios from './axios';
import request from './request';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'; 

const Banner = ()=>{

    const [banner, setBanner] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    useEffect(()=>{
    const data = async ()=>{
    let url = await axios.get(request.fetchTrending);
    setBanner(url.data.results[Math.floor(Math.random() * url.data.results.length)]);
    return url;
    }
    data();
    },[setBanner]);


    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    const playMovie = (getMovies)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else {
            movieTrailer(getMovies?.name || getMovies?.title || getMovies?.original_name || "")
            .then((url)=>{
                const urlParams = new URLSearchParams( new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch((error)=>{
                console.log("Trailer Not Found");
            })
        }
        }

        const truncate = (str, n) =>{
            return str?.length > n ? str.substr(0, n - 1) + "..." : str;
        }


    return(
        <>
        <div className="banner" 
        style={{
            backgroundSize:"cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${banner?.backdrop_path}"
            )`,
            backgroundColor:"black", 
        }}
        >
            <div className="banner_section">
                <h2>{banner?.name || banner?.title || banner?.original_name}</h2>
                <p>{truncate(banner?.overview, 150)}</p>
                <div className="buttons">
                    <button className="play" onClick={() => playMovie(banner)}>Play</button>
                    <button className="watch_list">Watch List</button>
                </div>
            </div>
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </>
    )
}

export default Banner;