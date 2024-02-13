import React, { useContext, useEffect, useState } from 'react'
import VideoCard from '../reusable/VideoCard';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import SkeletonLoader from '../reusable/SkeletonLoader';
import PaginationComponent from '../reusable/Pagination';
import NothingToShow from '../reusable/NothingToShow';

interface propType {
    searchInput: string;
    searchQuery: string;
}

function Recommended({ searchInput, searchQuery }: propType) {

    const [allVideos, setAllVideos] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [count, setCount] = useState<number>(1)


    const [pageNo, setPageNo] = useState<number>(1) //State for pagination


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                await axios.get(`/dashboard/recommended?search=${searchQuery}&pageNo=${pageNo}`)
                    .then((response) => {
                        setAllVideos(response.data?.results)
                        setCount(response.data?.total_pages)
                        setLoading(false)
                    })
            } catch (error) {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [searchInput, pageNo])


    return (
        <section className=''>
            <h1 className='text-xl'>
                {!searchInput ? "Recommended for you" : `Found ${allVideos?.length * count} results of '${searchInput}'`}
            </h1>
            {!loading ?

                allVideos.length > 0 ?
                    <>
                        <div className='grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
                            {allVideos && allVideos.map((video, index) => {
                                return (
                                    <VideoCard
                                        imageUrl={video?.poster_path}
                                        title={video?.title || video?.name}
                                        adult={video?.adult}
                                        id={video?.id}
                                        videoType={
                                            video?.first_air_date ? "tv" : "movie"
                                        }
                                        releaseDate={video?.release_date || video?.first_air_date}
                                    />
                                )
                            })}
                        </div>
                        <PaginationComponent count={count} setPageNo={setPageNo} />
                    </>
                    :
                    <NothingToShow/>

                :
                <SkeletonLoader />
            }

        </section>
    )
}

export default Recommended