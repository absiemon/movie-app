import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

interface queryParamsType {
  type: string;
  id: Number;
}

function VideoDetailsPage() {
  const { setSnackbar} = useContext(AppContext)

  const { search } = useLocation()
  const [videoInfo, setVideoInfo] = useState({})
  const [loading, setLoading] = useState<boolean>(false)
  const [params, setParams] = useState<queryParamsType>()

  useEffect(() => {

    setLoading(true)

    const queryParams = new URLSearchParams(search);
    const queryParamsObject: queryParamsType = {};
    for (const [key, value] of queryParams.entries()) {
      queryParamsObject[key] = value;
    }
    setParams(queryParamsObject)

    if (queryParams && queryParamsObject?.type && queryParamsObject?.id) {
      axios.get(`${queryParamsObject?.type}/get/${queryParamsObject?.id}/info`)
        .then((res) => {
          setVideoInfo(res.data)
        })
        .catch((err) => {
          setSnackbar((prev) => {
            return { ...prev, open: true, message: "Error occurred" };
          });
        })
    }
    setLoading(false)
  }, [])

  return (
    <main className='xs:block bdmd:flex w-full gap-20'>
      <img
        src={`https://image.tmdb.org/t/p/w500/${videoInfo?.poster_path}`}
        alt='image'
        className='xs:h-[50vh] bdmd:h-[80vh] rounded-md'
      />
      <section className=' flex flex-col gap-4 w-full h-full bdmd:justify-between px-3 xs:mt-5 bdmd:mt-0'>
        <h1 className='text-3xl font-semibold'>
          {videoInfo?.original_title || videoInfo?.name}
        </h1>
        <h1 className='text-2xl'>3.9</h1>

        {params?.type === 'movie' ? 
          <div className='flex justify-between'>
            <div className='flex flex-col gap-1 font-semibold'>
              <p className='text-primary'>Length</p>
              <p className=''>{videoInfo?.runtime}</p>
            </div>
            <div className='flex flex-col gap-1 font-semibold'>
              <p className='text-primary'>Language</p>
              <p className=''>{videoInfo?.original_language}</p>
            </div>
            <div className='flex flex-col gap-1 font-semibold'>
              <p className='text-primary'>Year</p>
              <p className=''>{videoInfo?.release_date}</p>
            </div>
            <div className='flex flex-col gap-1 font-semibold'>
              <p className='text-primary'>Status</p>
              <p className=''>{videoInfo?.status}</p>
            </div>
          </div>
        :
          <div className='flex justify-between'>
          <div className='flex flex-col gap-1 font-semibold'>
            <p className='text-primary'>Language</p>
            <p className=''>{videoInfo?.original_language}</p>
          </div>
          <div className='flex flex-col gap-1 font-semibold'>
            <p className='text-primary'>First Air</p>
            <p className=''>{videoInfo?.first_air_date}</p>
          </div>
          <div className='flex flex-col gap-1 font-semibold'>
            <p className='text-primary'>Last Air</p>
            <p className=''>{videoInfo?.last_air_date}</p>
          </div>
          <div className='flex flex-col gap-1 font-semibold'>
            <p className='text-primary'>Status</p>
            <p className=''>{videoInfo?.status || 'N/A'}</p>
          </div>
        </div>
        }
       

        {/*Genres  */}
        <div className='font-semibold'>
          <p className=''>Genres</p>
          <div className='flex flex-wrap mt-2 gap-3'>
            {videoInfo?.genres?.map((elm) => {
              return (
                <div className='w-fit bg-white px-2 py-1 text-black rounded-lg' key={elm?.id}>
                  {elm?.name}
                </div>
              )
            })}
          </div>
        </div>

        {/* Synopsis */}
        <div className='font-semibold'>
          <p >Synopsis</p>
          <p className='text-primary mt-2'>{videoInfo?.overview}</p>
        </div>

        {/* Casts */}
        <div className='font-semibold'>
          <p >Casts</p>
          <div className='flex flex-wrap mt-2 gap-3'>
            {videoInfo?.casts?.map((elm) => {
              return (
                <div className='w-fit border px-2 py-1  rounded-lg'>
                  {elm?.name}
                </div>
              )
            })}
          </div>
        </div>

      </section>
    </main>
  )
}

export default VideoDetailsPage