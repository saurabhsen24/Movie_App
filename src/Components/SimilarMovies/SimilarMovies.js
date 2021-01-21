import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { API_KEY } from '../../config';
import './SimilarMovies.css';
import Movie from '../Movie/Movie';

function SimilarMovies({ movieId }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => {
            console.log("similar movies ",response.data.results);
            setMovies(response.data.results);
        })
    },[movieId])

    return (
        <div className="similarMovies">
            {
                movies.map(movie => (
                (movie.poster_path || movie.backdrop_path) &&  <Movie
                    key={movie.id}
                    movie_id={movie.id}
                    title={movie.title}
                    image={movie.poster_path || movie.backdrop_path}
                    vote_avg={movie.vote_average}/>
                ))
            }
        </div>
    )
}

export default SimilarMovies;
