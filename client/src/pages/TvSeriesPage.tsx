//This Page will show all the tv series fetched from the server

import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/VideoCard';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import SkeletonLoader from '../components/reusable/SkeletonLoader';
import PaginationComponent from '../components/reusable/Pagination';
import NothingToShow from '../components/reusable/NothingToShow';
import {VideoType} from '../types/types'

function TVSeriesPage() {
  const { setSnackbar } = useContext(AppContext)

  //State to store all the tv series fetched from the server
  const [allTvSeries, setTvSeries] = useState<VideoType[]>([])

  //State to show Skeleton loader when data is being fetched from the server
  const [loading, setLoading] = useState<boolean>(true)
  
  //===================States for searching and pagination 
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [pageNo, setPageNo] = useState<number>(1);
  const [count, setCount] = useState<number>(1)

  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos


  //Fetching all the Tv series when page loads
  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        await axios.get(`/tv/get?search=${searchQuery}&pageNo=${pageNo}`)
          .then((response) => {
            setTvSeries(response.data?.results)
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
    fetchTVSeries()
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
          placeholder='Search for Tv Series'
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
          {!searchInput ? "Tv Series" : `Found ${(allTvSeries.length || 1) * count} results for '${searchInput}'`}
        </h1>
        {!loading ?

          allTvSeries.length > 0 ?
            <>
              <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
                {allTvSeries && allTvSeries.map((series, _index) => {
                  return (
                    <VideoCard
                      imageUrl={series?.poster_path}
                      title={series?.name}
                      adult={series?.adult}
                      id={series?.id}
                      videoType="tv"
                      releaseDate={series?.first_air_date}
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

export default TVSeriesPage