import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/videoCard';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function BookmarkPage() {
    const { setSnackbar, searchQuery, setSearchQuery, isSearching, setIsSearching } = useContext(AppContext)

    const [movies, setMovies] = useState([])
    const [tvSeries, setTvSeries] = useState([])

    const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        setLoading(true)
        await axios.get(`/bookmark/get`)
          .then((response) => {
            setMovies(response.data?.data?.movie)
            setTvSeries(response.data?.data?.tv)
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
      }
    }
    fetchBookmark()
  }, [isSearching])

  const handleSearch = async () => {
    if (searchQuery.length > 0) {
      setIsSearching(true)
    }
    else {
      setIsSearching(false);
    }
  }

  return (
    <main className='flex flex-col w-[95vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{ color: 'white' }} />
        <input
          type='text'
          placeholder='Search for bookmarks'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </header>

      <section className=''>
        <h1 className='text-xl'>
          Movies
        </h1>
        <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
          {movies && movies.map((movie, index) => {
            return (
              <VideoCard
                imageUrl={movie?.videoId?.poster_path}
                title={movie?.videoId?.title}
                adult={movie?.videoId?.adult}
                id={movie?.videoId?.videoId}
                videoType="movie"
                releaseDate={movie?.videoId?.release_date}
                bookmark={true}
              />
            )
          })}
        </div>
      </section>

      <section className=''>
        <h1 className='text-xl'>
          Tv Series
        </h1>
        <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
          {tvSeries && tvSeries.map((series, index) => {
            return (
                <VideoCard
                    imageUrl={series?.videoId?.poster_path}
                    title={series?.videoId?.title}
                    adult={series?.videoId?.adult}
                    id={series?.videoId?.videoId}
                    videoType="tv"
                    releaseDate={series?.videoId?.release_date}
                    bookmark={true}
                />
            )
          })}
        </div>
      </section>

    </main>
  )
}

export default BookmarkPage