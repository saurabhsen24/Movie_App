import { Card, CardContent, CardMedia } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem/SidebarItem';
import axios from '../../axios';
import { API_KEY } from '../../config'; 

function Sidebar() {

    const [moviesOpeningThisWeek, setMoviesOpeningThisWeek] = useState([]);
    const [moviesPlayingNow, setMoviesPlayingNow] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [moviesAroundTheWeb, setMoviesAroundTheWeb] = useState([]);

    useEffect(() => {
        axios.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => setMoviesOpeningThisWeek(response.data.results))
    }, []);

    useEffect(() => {
        axios.get(`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => setMoviesPlayingNow(response.data.results));
    },[])

    useEffect(() => {
        axios.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => setTopRatedMovies(response.data.results));
    },[]);

    useEffect(() => {
        axios.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => setMoviesAroundTheWeb(response.data.results))
    },[])

    return (
        <div className="sidebar">
            <Card className="sidebar__container">
                <CardMedia
                className="sidebar__image"
                component="img"
                alt=""
                width="250"
                height="150"
                image="http://image.tmdb.org/t/p/w1280/5BwqwxMEjeFtdknRV792Svo0K1v.jpg"
                />
                <CardContent className="sidebar__list">
                    <SidebarItem title="OPENING THIS WEEK" movies={moviesOpeningThisWeek}/>
                    <SidebarItem title="NOW PLAYING" movies={moviesPlayingNow}/>
                    <SidebarItem title="TOP RATED" movies={topRatedMovies} />
                    <SidebarItem title="AROUND THE WEB" movies={moviesAroundTheWeb}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default Sidebar;
