import { useContext, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './reusable.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

interface VideoCardProps {
    imageUrl: string;
    title?: string;
    adult?: boolean;
    id?: number;
    videoType: string;
    releaseDate?: string;
    bookmark?:boolean;
    bookmarkId?:any;
}
  

function VideoCard({title, imageUrl, adult, id, videoType, releaseDate, bookmark=false, bookmarkId}:VideoCardProps ) {
    
    const {createBookmark, removeBookmark, fetchBookmark, setSnackbar} = useContext(AppContext)
    const [isBookmarked, setIsBookmarked] = useState(bookmark)

    const handleCreateBookMark = async()=>{
        const videoInfo = {
            title, 
            release_date: releaseDate,
            poster_path: imageUrl,
            adult, id
        }
        await createBookmark(videoInfo, videoType)
        setIsBookmarked(true)
    }

    const handleRemoveBookmark = async()=>{
        if(!bookmarkId){
            setSnackbar((prev) => {
                return { ...prev, open: true, message: "Go to bookmark tab to remove." };
            });
            return;
        }
        await removeBookmark(bookmarkId)
        setIsBookmarked(false)
        await fetchBookmark()
    }

    const navigate = useNavigate();

    return (
        <div className='h-[240px] w-[250px] relative videCard-container'>
            <img
                src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
                alt='image'
                className='rounded-lg h-[170px] w-[250px] hover:opacity-70 cursor-pointer object-cover'
                role='button'
                onClick={()=> 
                    navigate(`/home/video/details?type=${videoType}&id=${id}`)
                }
            />

            <div className={`absolute top-3 right-3 bg-gray-600 bg-opacity-50  h-10 w-10 flex items-center justify-center rounded-full hover:bg-white cursor-pointer hover:text-black `} 
            >
                {!isBookmarked ? 
                    <BookmarkBorderIcon  onClick={handleCreateBookMark}/>
                    :
                    <BookmarkIcon onClick={handleRemoveBookmark}/>
                }
            </div>

            <div
                className='gap-2 absolute top-[70px] left-[90px] bg-white bg-opacity-30 p-2 rounded-full text-xl hidden cursor-pointer play-container'
                role='button'
                onClick={()=> 
                    navigate(`/home/video/details?type=${videoType}&id=${id}`)
                }
            >
                <PlayCircleIcon sx={{ fontSize: '30px' }} />
                <p>Play</p>
            </div>


            <div className='flex gap-7 text-primary text-sm mt-2'>
                <p>{releaseDate?.split('-')[0]}</p>
                <ul className='flex list-disc gap-6'>
                    <li>{videoType}</li>
                    <li>{adult ? '18+' : 'PG'}</li>
                </ul>
            </div>
            <h1 className=''>
                {
                    title?.slice(0, 20)
                }
            </h1>

        </div>
    )
}

export default VideoCard