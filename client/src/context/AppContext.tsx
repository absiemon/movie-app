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
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>; 
  searchQuery: string;
  isSearching: boolean;
  createBookmark: any;
}


export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [isAppLoading, setisAppLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
        // navigate('/home')
      })
      .catch((err) => {
        setisAppLoading(false);
        navigate("/");
      });
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
        searchQuery, setSearchQuery,
        isSearching, setIsSearching,
        createBookmark
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
