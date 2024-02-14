import{ useContext } from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation } from 'react-router-dom';
import { Avatar, Tooltip } from '@mui/material';
import { AppContext } from '../context/AppContext';

function sidebar() {
    const { user } = useContext(AppContext)
    const location = useLocation();
    const { pathname } = location;

    const handleLogOut = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <header
            className='h-[90vh] xs:w-[20vw] sm:w-[10vw] md:w-[5vw] bg-secondary 
            rounded-2xl flex flex-col items-center py-4 justify-between fixed overflow-y-scroll'
        >

            <div className='flex flex-col items-center gap-7'>
                <MovieCreationIcon
                    sx={{ fontSize: '30px', color: '#FC4747', mb: 4 }}
                />
                <Link to='/home'>
                    <Tooltip title="Dashboard" placement='right-start' >
                        <DashboardIcon
                            sx={{
                                color: `${pathname === '/home' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/movies'>
                    <Tooltip title="Movies" placement='right-start' >
                        <TheatersIcon
                            sx={{
                                color: `${pathname === '/home/movies' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/tv-series'>
                    <Tooltip title="Tv Series" placement='right-start' >
                        <LiveTvIcon
                            sx={{
                                color: `${pathname === '/home/tv-series' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/home/bookmark'>
                    <Tooltip title="Bookmark" placement='right-start' >
                        <BookmarkIcon
                            sx={{
                                color: `${pathname === '/home/bookmark' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
                <Link to='/fav-genres'>
                    <Tooltip title="Fav Genres" placement='right-start' >
                        <FavoriteIcon
                            sx={{
                                color: `${pathname === '/fav-genres' ? 'white' : '#5A698F'}`
                            }}
                        />
                    </Tooltip>
                </Link>
            </div>
            <div className='flex flex-col items-center gap-6 '>
                <Tooltip title="Logout" placement='right-start' >
                    <div className='text-[#5A698F] hover:text-[#FFFFFF] cursor-pointer' onClick={handleLogOut}>
                        <LogoutIcon />
                    </div>
                </Tooltip>

                <Avatar sx={{ backgroundColor: '#FC4747', color: '#FFFFFF' }}>
                    {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
            </div>
        </header>
    )
}

export default sidebar