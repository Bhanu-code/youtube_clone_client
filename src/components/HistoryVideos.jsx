
import { Link } from "react-router-dom";
import { Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle, RemoveRedEye, ThumbUpAltOutlined } from "@mui/icons-material";

import { useState, useEffect } from "react";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';
import { fetchHistory } from "../utils/fetchAPI";

const HistoryVideos = ({videoId}) => {
  const [snippet, setSnippet] = useState({})

    useEffect(() => {
      fetchHistory(videoId)
      .then((data)=>(
        setSnippet(data.items[0].snippet)
      ))
    }, [])
    


  return (
    <Card sx={{ width: { md: '320px', xs: '100%', boxShadow: 'none', borderRadius: 0 } }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <CardMedia
            image={snippet?.thumbnails?.high?.url}
            alt={snippet?.title}
            sx={{ wdith: 358, height: 180 }}
          />
        </Link>

        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#FFF"
            >
              {snippet?.title?.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="gray"
            >
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
            </Typography>
          </Link>
          
        </CardContent>
        
    </Card>
  )
}

export default HistoryVideos