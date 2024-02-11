import SearchIcon from '@mui/icons-material/Search';
import VideoCard from '../components/reusable/videoCard';
import TrendingBox from '../components/home/TrendingBox';

function HomePage() {
  return (
    <main className='flex flex-col w-[88vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{color:'white'}}/>
        <input type='text' placeholder='Search for movies or TV series '/>
      </header>

      <section className=''>
        <h1 className='text-xl'>Trendings</h1>
        <TrendingBox/>
      </section>

      <section className=''>
        <h1 className='text-xl'>Recommended for you</h1>
        <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 gap-4 mt-4'>
          {/* <VideoCard/>
          <VideoCard/>
          <VideoCard/>
          <VideoCard/> */}
        </div>
      </section>

    </main>
  )
}

export default HomePage