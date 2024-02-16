//This Page will show all the movies fetched from the server

import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/VideoCard';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import SkeletonLoader from '../components/reusable/SkeletonLoader';
import PaginationComponent from '../components/reusable/Pagination';
import NothingToShow from '../components/reusable/NothingToShow';
import {VideoType} from '../types/types'

function MoviePage() {
  const { setSnackbar } = useContext(AppContext)

  //State to store all the movies fetched from the server
  const [allMovies, setAllMovies] = useState<VideoType[]>([])

  //State to show Skeleton loader when data is being fetched from the server
  const [loading, setLoading] = useState<boolean>(true)

  
  //===================States for searching and pagination 
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [pageNo, setPageNo] = useState<number>(1);
  const [count, setCount] = useState<number>(1)

  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos


  //Fetching all the movies when page loads
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        await axios.get(`/movie/get?search=${searchQuery}&pageNo=${pageNo}`)
          .then((response) => {
            setAllMovies(response.data?.results)
            setCount(response.data?.total_pages)
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Error occurred" };
        });
      }
    }
    fetchMovies()
  }, [searchInput, pageNo])

  const handleSearch = async () => {
    setPageNo(1)
    setSearchInput(searchQuery)
  }

  return (
    <main className='flex flex-col w-[95vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{ color: 'white' }} />
        <input
          type='text'
          placeholder='Search for movies'
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
          {!searchInput ? "Movies" : `Found ${(allMovies?.length || 1) * count} results for '${searchInput}'`}
        </h1>
        {!loading ?

          allMovies?.length > 0 ?
            <>
              <div className='xs:flex xs:flex-col xs:items-center sm:grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
                {allMovies && allMovies.map((movie, _index) => {
                  return (
                    <VideoCard
                      imageUrl={movie?.poster_path}
                      title={movie?.original_title}
                      adult={movie?.adult}
                      id={movie?.id}
                      videoType="movie"
                      releaseDate={movie?.release_date}
                    />
                  )
                })}
              </div>
              <PaginationComponent count={count} setPageNo={setPageNo} />
            </>
            :
            <NothingToShow />
          :
          <SkeletonLoader />
        }
      </section>

    </main>
  )
}

export default MoviePage