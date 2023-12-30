
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed, History } from "./components"

import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user.currentUser);
  console.log(user)

  return (
    <Router>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:search" element={<SearchFeed />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App
