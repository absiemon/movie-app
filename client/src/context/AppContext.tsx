import { createContext, useState, ReactNode, useLayoutEffect } from "react";
import {userType, snackbarType} from '../types/types'
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  isAuthenticated: boolean;
  isAppLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<userType>>; 
  user: userType;
  setSnackbar: React.Dispatch<React.SetStateAction<snackbarType>>; 
  snackbar: snackbarType;
  handleClose: any;

  createBookmark: any;
  removeBookmark: any;
  fetchBookmark: any;
  movies: any; 
  setMovies: React.Dispatch<React.SetStateAction<any>>; 
  tvSeries: any; 
  setTvSeries: React.Dispatch<React.SetStateAction<any>>; 
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  pageNo: number; 
  setPageNo: React.Dispatch<React.SetStateAction<number>>; 
}


export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [isAppLoading, setisAppLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const [pageNo, setPageNo] = useState<number>(1)

  //========States for bookmark page
  const [movies, setMovies] = useState([])
  const [tvSeries, setTvSeries] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  //========================================

  const navigate = useNavigate()

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: ""
  })
  const handleClose = () => {
    setSnackbar((prev) => {
      return { ...prev, open: false };
    });
  };

  const fetchProfile = async()=>{
    axios
      .get("/auth/me")
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data?.content?.data);
        setisAppLoading(false);
        navigate('/home')
      })
      .catch((err) => {
        setisAppLoading(false);
        navigate("/");
      });
  }

  const fetchBookmark = async(search="")=>{

    await axios.get(`/bookmark/get?search=${search}`)
    .then((response) => {
      setMovies(response.data?.data?.movie)
      setTvSeries(response.data?.data?.tv)
      setLoading(false)
    })
    .catch((err)=>{
      setLoading(false)
      setSnackbar((prev) => {
        return { ...prev, open: true, message: "Error occurred" };
      });
    })
  }

  const createBookmark = async(videoInfo: any, bookmark_type: string)=>{

    await axios.post('/bookmark/create', {videoInfo, bookmark_type})
    .then(()=>{
      setSnackbar((prev) => {
        return { ...prev, open: true, message: "Bookmarked successfully" };
      });
    })
    .catch((err)=>{
      setSnackbar((prev) => {
        return { ...prev, open: true, message: "Error occurred" };
      });
    })
  }

  const removeBookmark = async(bookmarkId: any)=>{

    await axios.delete(`/bookmark/delete?bookmarkId=${bookmarkId}`)
    .then(()=>{
      setSnackbar((prev) => {
        return { ...prev, open: true, message: "Bookmark deleted successfully" };
      });
    })
    .catch((err)=>{
      setSnackbar((prev) => {
        return { ...prev, open: true, message: "Error occurred" };
      });
    })
  }

  useLayoutEffect(()=>{
    fetchProfile()
  },[])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user, setUser,
        snackbar, setSnackbar, handleClose,
        isAppLoading, setisAppLoading,

        createBookmark,
        removeBookmark,
        fetchBookmark,
        movies, setMovies,
        tvSeries, setTvSeries,
        loading, setLoading,
        pageNo, setPageNo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
