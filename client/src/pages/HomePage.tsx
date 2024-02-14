import SearchIcon from '@mui/icons-material/Search';
import TrendingBox from '../components/home/TrendingBox';
import Recommended from '../components/home/Recommended';
import { useState } from 'react';

function HomePage() {

  //===================States for searching and pagination 
  const [searchQuery, setSearchQuery] = useState<string>(""); //state for onChange of input box
  const [searchInput, setSearchInput] = useState<string>("");  //state for searching videos
 
  const handleSearch = async () => {
    setSearchInput(searchQuery)
  }

  return (
    <main className='flex flex-col xs:w-[60vw] sm:w-[80vw] md:w-[88vw] gap-6'>
      <header className='bg-secondary h-[50px] rounded-xl flex gap-2 items-center px-3'>
        <SearchIcon sx={{color:'white'}}/>
        <input
          type='text'
          placeholder='Search for movies or TV Series'
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
        <h1 className='text-xl'>Trendings</h1>
        <TrendingBox/>
      </section>

      <section className=''>
        <Recommended searchInput={searchInput} searchQuery={searchQuery}/>
      </section>

    </main>
  )
}

export default HomePage