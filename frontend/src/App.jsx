import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoRoom from './components/VideoRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:meetingId" element={<VideoRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
