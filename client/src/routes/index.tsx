
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
const HomePage = lazy(()=> import('../pages/HomePage'))
import AuthPage from '../pages/AuthPage'

import Layout from '../layout/index'
import FavGenres from '../pages/FavGenres';
import MoviePage from '../pages/MoviePage';
import TVSeriesPage from '../pages/TvSeriesPage';
import VideoDetailsPage from '../components/reusable/VideoDetailsPage';
import BookmarkPage from '../pages/BookmarkPage';

export default function Routes(){
    return useRoutes([
        {
            path: '/',
            children: [
                { element: <AuthPage />, index:true},
                { path:'fav-genres',  element: <FavGenres />}

            ]
        },

        {
            path: 'home',
            element: <Layout/>,
            children: [
                { 
                    path:'', element: <HomePage />,
                },
                { 
                    path:'movies', element: <MoviePage />
                },
                { 
                    path:'tv-series', element: <TVSeriesPage />
                },
                { 
                    path:'video/details', element: <VideoDetailsPage />
                },
                { 
                    path:'bookmark', element: <BookmarkPage />
                },
            ]
        },
    ]);
}