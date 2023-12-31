import { useEffect, useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import SideBar  from './SideBar';
import Videos  from './Videos';

import { fetchData } from '../utils/fetchAPI';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchData(`search?part=snippet&q=${selectedCategory}`)
    .then((data)=> setVideos(data.items))
    console.log(videos);
  }, [selectedCategory]);
  
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{
        height: { sx: "auto", md: '92vh' }, borderRight: '1px solid #3d3d3d3',
        px: { sx: 0, md: 2 }
      }}>
        <SideBar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography className='copyright' variant='body2' sx={{ mt: 1.5,
        color: '#fff' }}>
        Copyright @2023

        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography variant='h4'
        fontWeight="bold"
        mb={2}
        sx={{ color: '#F31503' }}
        >
         {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
         {/* <span>Project has reached it's maximum API request(Rapid API) for the month. It will available from next month onwards</span> */}
        </Typography>
        <Videos videos={videos}/>
      </Box>

    </Stack>
  )
}

export default Feed