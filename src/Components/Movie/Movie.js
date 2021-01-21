import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import './Movie.css';
import { Link } from 'react-router-dom';

function Movie({ movie_id , title, image , vote_avg }) {
    return (
        <Link to={`/movie/${movie_id}`} className="movie__link">
            <div className="movie">
                    <img  className="movie__image" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} alt={`${title}`}/>
                    <h4 className="movie__title">{title}</h4>
                    <Rating 
                    className="movie__rating"
                    name="size-small" 
                    size="small" 
                    defaultValue={(vote_avg/10) * 5 } 
                    precision={0.5} 
                    readOnly />
            </div>
        </Link>
    )
}

export default Movie;
