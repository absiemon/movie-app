import { Container } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/customLoader/Loader';

interface allGenresType {
    name: string;
    id: number;
}

function FavGenres() {
    const { setSnackbar } = useContext(AppContext)
    const navigate = useNavigate()

    const [allGenres, setAllGenres] = useState<allGenresType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true)
                await axios.get('/dashboard/get/genres')
                    .then((response) => {
                        setAllGenres(response.data?.data?.genres)
                        setSelectedGenres(response.data?.favGenres?.genres || [])
                        setLoading(false)
                    })
                    .catch (()=>{
                        setLoading(false)
                        setSnackbar((prev) => {
                            return { ...prev, open: true, message: "Some error occured" };
                        });
                    }) 
            } catch (error) {
                console.log(error)
            }
        }
        fetchGenres()
    }, [])

    const handleGenresClick = (id: number) => {
        setSelectedGenres((prevGenres) => {
            const index = prevGenres?.indexOf(id);
            if (index !== -1) {
                return [...prevGenres.slice(0, index), ...prevGenres.slice(index + 1)];
            } else {
                return [...prevGenres, id];
            }
        });
    }

    const handleAddToFav = async()=>{
        setButtonLoading(true)
        await axios.post('/dashboard/add/genres', selectedGenres)
        .then(()=>{
            setButtonLoading(false)
            setSnackbar((prev) => {
                return { ...prev, open: true, message: "Favourite genres updated successfully" };
            });
            navigate('/home')

        }).catch(()=>{
            setButtonLoading(false)
            setSnackbar((prev) => {
                return { ...prev, open: true, message: "Some error occured" };
            });
        })
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 5, pb: 5 }}>

            <main className="mt-6  p-4 bg-secondary rounded-xl xs:w-[100%] sm:w-[60%]">
                <h1 className='text-2xl text-center'>
                    Choose Your Favourite
                    <br />
                    <span>Genres</span>
                </h1>
               {!loading ? 
               
               <div className='grid bdsm:grid-cols-2 bdmd:grid-cols-3 gap-4 mt-4'>
                    {allGenres && allGenres.map((elm) => {
                        return (
                            <div className='cursor-pointer bg-tertiary p-2 rounded-md flex justify-between' role='button'
                                onClick={() => handleGenresClick(elm?.id)}>
                                <p>{elm?.name}</p>
                                {
                                    selectedGenres.includes(elm?.id) ?
                                        <CheckIcon sx={{ backgroundColor: '#161D2F', borderRadius: '20px', padding: '4px' }} />
                                        : null
                                }
                            </div>
                        )
                    })}
                </div>
                :
                <Loader/>
                }
                <LoadingButton
                    loadingPosition="start"
                    onClick={handleAddToFav}
                    loading={buttonLoading}
                    disabled={selectedGenres?.length === 0}
                >
                    {!buttonLoading && "Add to favourite"}
                </LoadingButton>
            </main>
        </Container>

    )
}

export default FavGenres