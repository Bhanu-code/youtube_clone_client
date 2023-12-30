import React, { useState, useEffect } from 'react'

import { Stack, Box } from '@mui/material'
// import HistoryVideos from './HistoryVideos'


import { getHistory } from '../utils/fetchAPI';

const History = ({ direction }) => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        getHistory().then((data) => {
            setHistory(data)
        });

    }, []);


    return (
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
            {/* {history.map((item) => (
                <Box key={item.id}>
                    {<HistoryVideos videoId={item.video_id} />}
                    {console.log(item)}
                </Box>

            ))} */}

        </Stack>
    )
}

export default History