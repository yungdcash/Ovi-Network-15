import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useTracks } from '../../hooks/useSupabase';
import { useToastContext } from '../../contexts/ToastContext';
import TrackPlayer from '../music/TrackPlayer';

const { FiTrendingUp, FiArrowRight, FiCompass } = FiIcons;

function TrendingTracks({ setCurrentTrack, setIsPlaying }) {
  const { tracks, loading } = useTracks(6);
  const navigate = useNavigate();
  const toast = useToastContext();

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    toast.success(
      `🎵 Now playing "${track.title}" - Enjoy this premium track!`,
      {
        title: '🎧 Luxury Playback',
        duration: 3000,
        action: {
          label: 'View Player',
          onClick: () => {
            toast.info('Music player is at the bottom of your screen!', {
              title: '🎵 Player Location',
              duration: 2000
            });
          }
        }
      }
    );
  };

  const handleViewAll = () => {
    toast.info(
      '🌟 Opening the complete luxury music discovery portal with advanced filters and premium search!',
      {
        title: '🔍 Full Discovery Experience',
        duration: 3000
      }
    );
    
    setTimeout(() => {
      navigate('/discover');
    }, 500);
  };

  if (loading) {
    return (
      <motion.div
        className="card-3d p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
              <p className="text-white/60 text-sm">Most popular tracks today</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="loading-3d bg-white/5 rounded-xl h-64" />
          ))}
        </div>
        
        <div className="flex items-center justify-center h-32">
          <div className="text-white/60">Loading trending tracks...</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-3d p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center animate-glow-3d">
            <SafeIcon icon={FiTrendingUp} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <p className="text-white/60 text-sm">Most popular luxury tracks today</p>
          </div>
        </div>
        
        <motion.button 
          className="btn-3d-secondary text-sm flex items-center space-x-2 group"
          onClick={handleViewAll}
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View All</span>
          <SafeIcon icon={FiArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <TrackPlayer 
              track={track} 
              onPlay={handlePlayTrack} 
              isPlaying={false} 
            />
          </motion.div>
        ))}
      </div>

      {tracks.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <SafeIcon icon={FiCompass} className="text-white text-2xl" />
          </div>
          <div className="text-white/60 mb-4">No trending tracks found</div>
          <motion.button 
            className="btn-3d-primary flex items-center space-x-2 mx-auto"
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiCompass} />
            <span>Discover Luxury Music</span>
          </motion.button>
        </motion.div>
      )}

      {/* Enhanced Action Bar */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 rounded-xl border border-emerald-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiTrendingUp} className="text-emerald-400 text-xl" />
            <div>
              <h3 className="text-white font-semibold">Discover More Premium Music</h3>
              <p className="text-white/60 text-sm">Explore thousands of luxury tracks from elite creators</p>
            </div>
          </div>
          
          <motion.button
            className="btn-3d-primary flex items-center space-x-2"
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiCompass} />
            <span>Explore All</span>
            <SafeIcon icon={FiArrowRight} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TrendingTracks;