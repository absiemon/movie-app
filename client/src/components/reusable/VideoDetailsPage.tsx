import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

interface queryParamsType {
  type: string;
  id: Number;
}

function VideoDetailsPage() {

  const obj = {
    "adult": false,
    "backdrop_path": "/yOm993lsJyPmBodlYjgpPwBjXP9.jpg",
    "belongs_to_collection": null,
    "budget": 125000000,
    "genres": [
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      }
    ],
    "homepage": "https://www.wonkamovie.com",
    "id": 787699,
    "imdb_id": "tt6166392",
    "original_language": "en",
    "original_title": "Wonka",
    "overview": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
    "popularity": 3210.944,
    "poster_path": "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    "production_companies": [
      {
        "id": 174,
        "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
        "name": "Warner Bros. Pictures",
        "origin_country": "US"
      },
      {
        "id": 79,
        "logo_path": "/at4uYdwAAgNRKhZuuFX8ShKSybw.png",
        "name": "Village Roadshow Pictures",
        "origin_country": "US"
      },
      {
        "id": 214904,
        "logo_path": "/9S6xSAsUiE1zuKzxayco7fD0p26.png",
        "name": "The Roald Dahl Story Company",
        "origin_country": "GB"
      },
      {
        "id": 437,
        "logo_path": "/nu20mtwbEIhUNnQ5NXVhHsNknZj.png",
        "name": "Heyday Films",
        "origin_country": "GB"
      },
      {
        "id": 216687,
        "logo_path": null,
        "name": "Domain Entertainment",
        "origin_country": "US"
      }
    ],
    "production_countries": [
      {
        "iso_3166_1": "GB",
        "name": "United Kingdom"
      },
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
    ],
    "release_date": "2023-12-06",
    "revenue": 534652708,
    "runtime": 117,
    "spoken_languages": [
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      }
    ],
    "status": "Released",
    "tagline": "Every good thing in this world started with a dream.",
    "title": "Wonka",
    "video": false,
    "vote_average": 7.187,
    "vote_count": 1442,
    "credits": {
      "cast": [
        {
          "adult": false,
          "gender": 2,
          "id": 1190668,
          "known_for_department": "Acting",
          "name": "Timothée Chalamet",
          "original_name": "Timothée Chalamet",
          "popularity": 100.97,
          "profile_path": "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
          "cast_id": 5,
          "character": "Willy Wonka",
          "credit_id": "60abc25ac2b9df006c33cdb8",
          "order": 0
        },
        {
          "adult": false,
          "gender": 1,
          "id": 1939373,
          "known_for_department": "Acting",
          "name": "Calah Lane",
          "original_name": "Calah Lane",
          "popularity": 35.133,
          "profile_path": "/rhEcrfvtkIuzjOvt010xHiVHWXY.jpg",
          "cast_id": 26,
          "character": "Noodle",
          "credit_id": "615a2c7a1dcb7700875730b2",
          "order": 1
        },
        {
          "adult": false,
          "gender": 2,
          "id": 298410,
          "known_for_department": "Acting",
          "name": "Keegan-Michael Key",
          "original_name": "Keegan-Michael Key",
          "popularity": 40.185,
          "profile_path": "/vAR5gVXRG2Cl6WskXT99wgkAoH8.jpg",
          "cast_id": 16,
          "character": "Chief-of-Police",
          "credit_id": "613fca010cd32a00273ba223",
          "order": 2
        },
        {
          "adult": false,
          "gender": 2,
          "id": 3291,
          "known_for_department": "Acting",
          "name": "Hugh Grant",
          "original_name": "Hugh Grant",
          "popularity": 23.824,
          "profile_path": "/tUHkXYdwm405DjBm2IpPxGjYkjj.jpg",
          "cast_id": 50,
          "character": "Oompa-Loompa / Lofty",
          "credit_id": "64481d60140bad04a9a7876b",
          "order": 3
        },
        {
          "adult": false,
          "gender": 2,
          "id": 19868,
          "known_for_department": "Acting",
          "name": "Paterson Joseph",
          "original_name": "Paterson Joseph",
          "popularity": 20.904,
          "profile_path": "/n8kf0aowLTcPSt72k0eC4ZShe3s.jpg",
          "cast_id": 25,
          "character": "Arthur Slugworth",
          "credit_id": "615a2c6e51a64e0063565c13",
          "order": 4
        },
        {
          "adult": false,
          "gender": 1,
          "id": 39187,
          "known_for_department": "Acting",
          "name": "Olivia Colman",
          "original_name": "Olivia Colman",
          "popularity": 49.605,
          "profile_path": "/4ZwZ66zXZyX26Kf2wfeMt1tQZQf.jpg",
          "cast_id": 17,
          "character": "Mrs. Scrubbit",
          "credit_id": "61549cd241465c008dff8f4d",
          "order": 5
        },
        {
          "adult": false,
          "gender": 2,
          "id": 1464254,
          "known_for_department": "Acting",
          "name": "Tom Davis",
          "original_name": "Tom Davis",
          "popularity": 24.114,
          "profile_path": "/n7JqvXrpPsbpfeelPpZ5R8HTWMG.jpg",
          "cast_id": 21,
          "character": "Bleacher",
          "credit_id": "615a2c3669eb90008a3d293a",
          "order": 6
        },
      ],
    }
  }

  const { search } = useLocation()
  const [videoInfo, setVideoInfo] = useState(obj)
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
      axios.get(`${queryParamsObject?.type}/${queryParamsObject?.id}/info`)
        .then((res) => {
          setVideoInfo(res.data)
        })
        .catch((err) => {

        })
    }
    setLoading(false)
  }, [])

  return (
    <main className='xs:block bdmd:flex w-full gap-20'>
      <img
        src={`https://image.tmdb.org/t/p/w500/${obj?.poster_path}`}
        alt='image'
        className='xs:h-[50vh] bdmd:h-[80vh] rounded-md'
      />
      <section className=' flex flex-col gap-4 w-full h-full bdmd:justify-between px-3 xs:mt-5 bdmd:mt-0'>
        <h1 className='text-3xl font-semibold'>
          {videoInfo?.original_title}
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
            {videoInfo?.credits?.cast?.map((elm) => {
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