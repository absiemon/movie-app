//Page to show all bookmarks including tv series and movies
import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/VideoCard';
import { AppContext } from '../context/AppContext';
import SkeletonLoader from '../components/reusable/SkeletonLoader';
import NothingToShow from '../components/reusable/NothingToShow';

function BookmarkPage() {
  const {
    fetchBookmark, movies, tvSeries,
    loading, setLoading
  } = useContext(AppContext)

  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos

  //Fethcing all bookmars when page loads
  useEffect(() => {
    setLoading(true)
    fetchBookmark(searchInput)
  }, [searchInput])

  const handleSearch = async () => {
    setSearchInput(searchQuery)
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
        {!loading ?

          movies?.length > 0 ?
            <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
              {movies && movies.map((movie, _index) => {
                return (
                  <VideoCard
                    imageUrl={movie?.videoId?.poster_path}
                    title={movie?.videoId?.title}
                    adult={movie?.videoId?.adult}
                    id={movie?.videoId?.videoId}
                    videoType="movie"
                    releaseDate={movie?.videoId?.release_date}
                    bookmark={true}
                    bookmarkId={movie?._id}
                  />
                )
              })}
            </div>
            :
            <NothingToShow />
          :
          <SkeletonLoader count={5} />
        }
      </section>

      <section className=''>
        <h1 className='text-xl'>
          Tv Series
        </h1>
        {!loading ?

          tvSeries?.length > 0 ?
            <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
              {tvSeries && tvSeries.map((series, _index) => {
                return (
                  <VideoCard
                    imageUrl={series?.videoId?.poster_path}
                    title={series?.videoId?.title}
                    adult={series?.videoId?.adult}
                    id={series?.videoId?.videoId}
                    videoType="tv"
                    releaseDate={series?.videoId?.release_date}
                    bookmark={true}
                    bookmarkId={series?._id}
                  />
                )
              })}
            </div>
            :
            <NothingToShow />
          :
          <SkeletonLoader count={5} />
        }
      </section>

    </main>
  )
}

export default BookmarkPage