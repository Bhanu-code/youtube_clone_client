import React, { useState, useEffect } from 'react'

import { Stack, Box, Button } from '@mui/material'
import HistoryVideos from './HistoryVideos'


import { clearHistory, getHistory } from '../utils/fetchAPI';
import { getCookie } from '../utils/getCookie';
import { useNavigate } from 'react-router-dom';

const History = ({ direction }) => {
    const [watchlist, setWatchlist] = useState([]);
    useEffect(() => {
        getWatchlist().then((data) => {
            setWatchlist(data)
        });

    }, []);


    const userId = getCookie('userId');

    const handleClick = (e)=>{
        deleteWatchlist(userId);
    }


    return (
        <>
            
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
            
            {Watchlist.map((item) => (
                <Box key={item.id}>
                    {<HistoryVideos videoId={item.video_id} />}
                    {console.log(item)}
                </Box>

            ))}

        </Stack>
        <br />
        <Button onClick={handleClick} size='large'>Delete Watchlist</Button>
        </>
    )
}

export default History