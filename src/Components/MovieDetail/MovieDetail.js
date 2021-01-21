import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import { API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from '../../config';
import './MovieDetail.css';
import { Chip } from '@material-ui/core';
import SimilarMovies from '../SimilarMovies/SimilarMovies';

function MovieDetail() {

    const [movieDetails, setMovieDetails] = useState({
        genres: []
    })
    const { movieId } = useParams()

    useEffect(() => {
        axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            console.log(response.data);
            setMovieDetails(response.data);
        })
    },[movieId])

    return (
        <div className="movieDetail">
            <div className="movieDetail__container">
                    <div className="movieDetail__top">
                        <img  className="movieDetail__image" src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieDetails.poster_path}`} alt={`${movieDetails.title}`}/>
                        <div className="movieDetail__content">
                            <h3 className="movieDetail__title">{movieDetails.title}</h3>
                            <h4 className="movieDetail__tagline">{movieDetails.tagline}</h4>
                            
                            <div className="movieDetail__rating">
                                {
                                    movieDetails.vote_average && (
                                        <Rating       
                                        size="small" 
                                        defaultValue={(movieDetails.vote_average/10)*5}
                                        precision={0.5} 
                                        readOnly />
                                    )
                                }

                                <p>{movieDetails.runtime}min / {movieDetails.status}</p>
                            </div>

                            <div className="movieDetail__genre">
                                <h4 className="movieDetail__heading">THE GENRE</h4>
                                <div className="movieDetail__chip">
                                    {
                                        movieDetails?.genres?.length > 0 ?
                                        movieDetails.genres.map((genre, idx) => (
                                            <Chip key={idx} label={genre.name}/>
                                        )) : <Chip label="No genres available"/>
                                    }
                                </div>

                            </div>

                            <h4 className="movieDetail__heading">THE SYNOPSIS</h4>
                            <p className="movieDetail__overview">{movieDetails.overview ? movieDetails.overview : "No Synopsis Present"}</p>
                            <div className="movieDetail__tags">
                                <Link to="/" className="movieDetail__link">
                                    <Chip label="Website"/>
                                </Link>
                                <Link to="/" className="movieDetail__link">
                                    <Chip label="Imdb"/>
                                </Link>
                                <Link to="/" className="movieDetail__link">
                                    <Chip label="Trailer"/>
                                </Link>
                                <Link to="/" className="movieDetail__link">
                                    <Chip label="Back"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="movieDetail__bottom">
                        <h3>Recommended</h3>
                        <SimilarMovies movieId={movieId}/>
                    </div>
            </div>
        </div>
    )
}

export default MovieDetail;
