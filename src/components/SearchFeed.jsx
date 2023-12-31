import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Videos from './Videos';

import { fetchData } from '../utils/fetchAPI';

import { useParams } from 'react-router-dom';

const SearchFeed = () => {
  const  { search } = useParams();
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchData(`search?part=snippet&q=${search}`)
      .then((data) => setVideos(data.items))
  }, [search])


  return (

    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4'
        fontWeight="bold"
        mb={2}
        sx={{ color: '#F31503' }}
      >
        Search Results for: <span style={{ color: "#F31503" }}>
          {search}
        </span> videos
        <br />
        {/* <span>Project has reached it's maximum API request(Rapid API) for the month. It will available from next month onwards</span> */}
      </Typography>
      <Videos videos={videos} />
    </Box>

  )
}

export default SearchFeed