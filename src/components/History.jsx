import React, { useState, useEffect } from 'react'

import { Stack, Box, Button } from '@mui/material'
import HistoryVideos from './HistoryVideos'


import { clearHistory, getHistory } from '../utils/fetchAPI';
import { getCookie } from '../utils/getCookie';
import { useNavigate } from 'react-router-dom';

const History = ({ direction }) => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        getHistory().then((data) => {
            setHistory(data)
        });

    }, []);


    const userId = getCookie('userId');

    const handleClick = (e)=>{
        clearHistory(userId);
    }


    return (
        <>
            
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
            
            {history.map((item) => (
                <Box key={item.id}>
                    {<HistoryVideos videoId={item.video_id} />}
                    {console.log(item)}
                </Box>

            ))}

        </Stack>
        <br />
        <Button onClick={handleClick} size='large'>Clear watch history</Button>
        </>
    )
}

export default History