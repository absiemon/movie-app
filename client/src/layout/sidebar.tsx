import React from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';

function sidebar() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <header className='h-[90vh] xs:w-[20vw] sm:w-[10vw] md:w-[5vw] bg-secondary rounded-2xl flex flex-col items-center py-4 justify-between fixed'>

            <div className='flex flex-col items-center gap-7'>
                <MovieCreationIcon
                    sx={{ fontSize: '30px', color: '#FC4747', mb: 4 }}
                />
                <Link to='/home'>
                    <DashboardIcon
                        sx={{
                            color: `${pathname === '/home' ? 'white' : '#5A698F'}`
                        }}
                    />
                </Link>
                <Link to='/home/movies'>
                    <TheatersIcon
                        sx={{
                            color: `${pathname === '/home/movies' ? 'white' : '#5A698F'}`
                        }}
                    />
                </Link>
                <Link to='/home/tv-series'>
                    <LiveTvIcon
                        sx={{
                            color: `${pathname === '/home/tv-series' ? 'white' : '#5A698F'}`
                        }}
                    />
                </Link>
                <Link to='/home/bookmark'>
                    <BookmarkIcon
                        sx={{
                            color: `${pathname === '/home/bookmark' ? 'white' : '#5A698F'}`
                        }}
                    />
                </Link>
            </div>
            <Avatar>

            </Avatar>
        </header>
    )
}

export default sidebar