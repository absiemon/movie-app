// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Skeleton from '@mui/material/Skeleton';

// function SkeletonLoader() {

//   return (
//     <Grid container wrap="nowrap">
//         <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
//             <Skeleton 
//                 variant="rectangular" 
//                 width={'250px'} 
//                 height={'170px'} 
//                 sx={{backgroundColor:'#161D2F'}}
//             />
//             <Box sx={{ pt: 0.5 }}>
//               <Skeleton width={'250px'} sx={{backgroundColor:'#161D2F'}}/>
//             </Box>
//         </Box>
//     </Grid>
//   );
// }
// export default SkeletonLoader;

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
interface propType{
  count?: number
}
function SkeletonLoader({count = 20}: propType) {
  // Define the number of elements you want to render

  return (
    <div className="grid bdsm:grid-cols-2 md:grid-cols-3 bdmd:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4  mt-4">
      
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="">
          <Skeleton variant="rectangular" width={'250px'} height={'170px'} sx={{ backgroundColor: '#161D2F' }} />
          <Skeleton width={'250px'} sx={{ backgroundColor: '#161D2F' }} />
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
