
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
