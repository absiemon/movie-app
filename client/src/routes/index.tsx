
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'

import Layout from '../layout/index'
import FavGenres from '../pages/FavGenres';
import MoviePage from '../pages/MoviePage';
import TVSeriesPage from '../pages/TvSeriesPage';
import VideoDetailsPage from '../components/reusable/VideoDetailsPage';
import BookmarkPage from '../pages/BookmarkPage';
import AuthGuard from '../components/auth/AuthGuard';

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            children: [
                { element: <AuthPage />, index: true },
                {
                    path: 'fav-genres',
                    element:
                        <AuthGuard>
                            <FavGenres />
                        </AuthGuard>,
                }
            ]
        },

        {
            path: 'home',
            element:
                <AuthGuard>
                    <Layout />
                </AuthGuard>,
            children: [
                {
                    path: '', element: <HomePage />,
                },
                {
                    path: 'movies', element: <MoviePage />
                },
                {
                    path: 'tv-series', element: <TVSeriesPage />
                },
                {
                    path: 'video/details', element: <VideoDetailsPage />
                },
                {
                    path: 'bookmark', element: <BookmarkPage />
                },
            ]
        },
    ]);
}