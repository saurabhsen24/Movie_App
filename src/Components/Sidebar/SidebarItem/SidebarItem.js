import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarItem.css';
import { IMAGE_BASE_URL,  POSTER_SIZE } from '../../../config';

function SidebarItem({ title, movies }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="sidebarItem">
            <h4 onClick={() => setOpen(!open)}>{ title }</h4>
            <div className={`sidebarItem__container ${open ? 'sidebarItem__show' : 'sidebarItem__hide'}`}>
                {
                    //movies.splice(0,5).map(m => console.log(m.poster_path))
                    movies?.slice(0,5).map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="sidebarItem__link">
                            <div className="sidebarItem__movie">
                                <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}/${movie.poster_path}`} alt={`${movie.title}`}/>
                                <p>{movie.title}</p>
                                <p className="sidebarItem__rating">{movie.vote_average}</p>
                            </div>
                        </Link>
                    ))
                }
                
            </div>
        </div>
    )
}

export default SidebarItem;
