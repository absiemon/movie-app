import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/videoCard';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function TVSeriesPage() {
    const { setSnackbar, searchQuery, setSearchQuery, isSearching, setIsSearching } = useContext(AppContext)
    const navigate = useNavigate()

    const [allTvSeries, setTvSeries] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchTVSeries = async () => {
            try {
                setLoading(true)
                await axios.get(`/tv-series/get?search=${searchQuery}`)
                    .then((response) => {
                        setTvSeries(response.data?.data?.results)
                        setLoading(false)
                    })
            } catch (error) {
                setLoading(false)
            }
        }
        fetchTVSeries()
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
        <SearchIcon sx={{color:'white'}}/>
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
        <h1 className='text-xl'>TV Series</h1>
        <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
            {allTvSeries && allTvSeries.map((series, index)=>{
                return (
                    <VideoCard
                        imageUrl = {series?.poster_path}
                        title = {series?.name}
                        adult = {series?.adult}
                        id = {series?.id}
                        videoType = "tv"
                        releaseDate = {series?.first_air_date}
                    />
                )
            })}

        </div>
      </section>

    </main>
  )
}

export default TVSeriesPage