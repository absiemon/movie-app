import { Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";


// Component to messages
function CustomSnackbar() {
    const {snackbar, handleClose} = useContext(AppContext)
    const {vertical, horizontal, open, message} = snackbar;

  return (
    <>
      <Snackbar
        // anchorOrigin={{ `bottom` }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        sx={{
            '& .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root':{
                backgroundColor:'#161D2F',
                color:'#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
            }
        }}
      />
    </>
  );
}

export default CustomSnackbar;
