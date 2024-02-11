import React from 'react';
import './Loader.css'; // Make sure to import the CSS file
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

//Coponent to create a custome Loader
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loading-icon">
        <MovieCreationIcon 
            sx={{fontSize:'50px', color:'#FC4747'}}
        />
      </div>
      <p className='text-sm text-primary'>Getting ready...</p>
    </div>
  );
};

export default Loader;