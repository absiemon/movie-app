import React, { useEffect, useRef, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import TrendingVideoCard from './TrendingVideoCard';
import '../reusable/reusable.css'

function TrendingBox() {
    const [trendings, setTrendings] = useState([]);

    const scrollerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollTo({
            left: scrollerRef.current.scrollLeft - 400,
            behavior: 'smooth',
          });
        }
      };
      
      const scrollRight = () => {
        if (scrollerRef.current) {
          scrollerRef.current.scrollTo({
            left: scrollerRef.current.scrollLeft + 400,
            behavior: 'smooth',
          });
        }
      };
      

    useEffect(() => {
        axios.get(`/dashboard/trendings`)
            .then((response) => {
                setTrendings(response.data?.results)
            }).catch((err) => {

            })
    }, [])

    return (
        <main className='w-full relative h-[30vh] px-8'>
            <div className='h-full flex items-center justify-center absolute left-0 z-10'>
                <p className='bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black'
                onClick={scrollLeft}

                >
                    <ArrowBackIosNewIcon />
                </p>
            </div>
            <div className='h-full flex items-center justify-center absolute right-0 z-10'>
                <p className='bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black'
                onClick={scrollRight}
                >
                    <ArrowForwardIosIcon />
                </p>
            </div>

            <section className='flex gap-10 w-[100%] overflow-x-scroll' ref={scrollerRef}>
                {trendings?.map((video, index) => {
                    return (
                        <div >

                            <TrendingVideoCard
                                imageUrl={video?.poster_path}
                                title={
                                    video?.media_type === 'movie'
                                        ? video?.title
                                        : video?.original_name
                                }
                                adult={video?.adult}
                                id={video?.id}
                                videoType={video?.media_type}
                                releaseDate={
                                    video?.media_type === 'movie'
                                        ? video?.release_date
                                        : video?.first_air_date
                                }
                            />
                        </div>
                    )
                })}
            </section>

        </main>
    )
}

export default TrendingBox