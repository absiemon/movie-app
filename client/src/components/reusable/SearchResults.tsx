import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import VideoCard from './videoCard';

interface VideoCardProps {
    type: string;
    allVideos: any;
}

function SearchResults({type, allVideos}: VideoCardProps) {
    const { searchQuery} = useContext(AppContext)

  return (
    <main className=''>
    <h1 className='text-xl'>Found n results for '{searchQuery}'</h1>
    <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 gap-4 mt-4'>
        {allVideos && allVideos.map((video, index)=>{
            return (
                <VideoCard
                    imageUrl = {video?.poster_path}
                    title = {
                        type='movie' ? video?.original_title : video?.name
                    }
                    adult = {video?.adult}
                    id = {video?.id}
                    videoType = {type}
                    releaseDate = {video?.release_date}
                />
            )
        })}
    </div>
  </main>
  )
}

export default SearchResults