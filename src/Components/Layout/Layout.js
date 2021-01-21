import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { API_KEY } from '../../config';
import Movie from '../Movie/Movie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader/Loader';
import './Layout.css';

function Layout() {

    const [movies , setMovies] = useState([]);
    const [page , setPage] = useState(1);
    const [totoalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState('')
    const [more, setMore] = useState(true)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
        .then(response => {
            console.log(movies);
            setLoading(false);
            setTotalPages(response.data.total_pages)
            setMovies([...movies].concat(response.data.results))
        })
    }, [page])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(query === ''){
            axios.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
            .then(response => {
                console.log(movies);
                setTotalPages(response.data.total_pages)
                setMovies(response.data.results)
            })

            return;
        }
        axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`)
        .then(response => {
            setMovies(response.data.results);
            setMore(false);
        })
    }
    
    return (
        <div className="layout">
            <h1 className="layout__title">Explore</h1>
            <form className="layout__input">
                <input 
                type="text" 
                value={query}
                placeholder="Find Movies, TV Shows, Celebrities and more..."
                onChange={e => setQuery(e.target.value)}/>
                <button onClick={handleSubmit} type="submit">Search</button>
            </form>
            <h1 className="layout__title">Popular Movies 2021</h1>
            <InfiniteScroll 
            dataLength={movies.length}
            next={() => setPage(page+1)}
            hasMore={page <= totoalPages && more}
            loader={<Loader/>}
            className="layout__movies">
            {
            movies.length > 0 ?
                movies.map(movie => (
                    (movie.poster_path || movie.backdrop_path) &&  
                    <Movie
                    key={movie.id}
                    movie_id={movie.id}
                    title={movie.original_title}
                    image={movie.poster_path || movie.backdrop_path}
                    vote_avg={movie.vote_average}/>
                )) : (
                    loading ? <Loader className="layout__loader"/> : <p className="layout__notFound">Sorry! Movie with the name not found </p>
                )
            }
            </InfiniteScroll>

        </div>
    )
}

export default Layout;
