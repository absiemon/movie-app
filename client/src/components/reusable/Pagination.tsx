import React, { useContext } from 'react'
import { Pagination } from '@mui/material';
import { AppContext } from '../../context/AppContext';

interface propType{
    count: number;
    setPageNo: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationComponent({count, setPageNo}:propType) {

    // const {setPageNo} = useContext(AppContext)
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPageNo(page)
    };

  return (
    <div className='flex items-center justify-center mt-4'>
      <Pagination 
        count={count} 
        variant="outlined" 
        onChange={handleChange}
    />
    </div>
  )
}

export default PaginationComponent