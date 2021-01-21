import React from 'react';
import './NotFound.css';
import GifImage from '../../assets/NotFound.gif';
import { useHistory } from 'react-router-dom';

function NotFound() {

    const history = useHistory();

    return (
        <div className="notFound">
            <img src={GifImage} alt="not_found"/>
            <button className="notFound__back" onClick={() => history.replace('/')}>Back To Homepage</button>
        </div>
    )
}

export default NotFound;
