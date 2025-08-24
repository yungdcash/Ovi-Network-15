import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import AuthGuard from './components/auth/AuthGuard';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Studio from './pages/Studio';
import Social from './pages/Social';
import Monetization from './pages/Monetization';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MusicPlayer from './components/player/MusicPlayer';
import './App.css';

function App() {
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <AuthGuard>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
                <Route path="/discover" element={<Discover setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
                <Route path="/dashboard" element={<Dashboard setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/social" element={<Social />} />
                <Route path="/monetization" element={<Monetization />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>

              {/* Music Player */}
              <MusicPlayer 
                currentTrack={currentTrack} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying} 
              />
            </MainLayout>
          </AuthGuard>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;