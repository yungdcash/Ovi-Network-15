import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiHeart, FiShare2, FiRepeat, FiShuffle, FiMoreHorizontal } = FiIcons;

function MusicPlayer({ currentTrack, isPlaying, setIsPlaying }) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 0.5 : 0));
        setCurrentTime(prev => prev + 0.5);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (currentTrack) {
      const [minutes, seconds] = currentTrack.duration.split(':');
      setDuration(parseFloat(minutes) * 60 + parseFloat(seconds));
      setProgress(0);
      setCurrentTime(0);
    }
  }, [currentTrack]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    setCurrentTime((newProgress / 100) * duration);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setVolume(newVolume);
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-0 left-0 right-0 player-3d z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Progress Bar */}
        <div className="progress-3d cursor-pointer" onClick={handleProgressClick}>
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-sm"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer border-2 border-purple-500"
            style={{ left: `${progress}%` }}
            whileHover={{ scale: 1.5 }}
            whileDrag={{ scale: 1.3 }}
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <motion.div 
                className="w-16 h-16 rounded-xl overflow-hidden border-gradient-3d"
                whileHover={{ scale: 1.1 }}
                animate={isPlaying ? { rotate: [0, 360] } : {}}
                transition={isPlaying ? { duration: 10, repeat: Infinity, ease: "linear" } : {}}
              >
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm truncate">{currentTrack.title}</h3>
                <p className="text-white/60 text-sm truncate">{currentTrack.artist}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-white/40">{formatTime(currentTime)}</span>
                  <span className="text-xs text-white/40">/ {currentTrack.duration}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mx-8">
              <motion.button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiShuffle} className="text-white/70 text-lg" />
              </motion.button>
              
              <motion.button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiSkipBack} className="text-white text-xl" />
              </motion.button>
              
              <motion.button 
                className="w-14 h-14 btn-3d-primary rounded-full flex items-center justify-center"
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon 
                  icon={isPlaying ? FiPause : FiPlay} 
                  className="text-white text-xl ml-0.5" 
                />
              </motion.button>
              
              <motion.button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiSkipForward} className="text-white text-xl" />
              </motion.button>
              
              <motion.button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiRepeat} className="text-white/70 text-lg" />
              </motion.button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              {/* Volume */}
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiVolume2} className="text-white/60" />
                <div className="w-24 h-1 bg-white/20 rounded-full relative cursor-pointer" onClick={handleVolumeChange}>
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                    style={{ width: `${volume}%` }} 
                  />
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg cursor-pointer border border-purple-500" 
                    style={{ left: `${volume}%` }} 
                  />
                </div>
                <span className="text-xs text-white/40 w-8">{Math.round(volume)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button 
                  className={`p-2 rounded-lg transition-all ${
                    isLiked ? 'text-red-400 bg-red-500/20' : 'text-white/60 hover:text-red-400 hover:bg-white/10'
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiHeart} className={isLiked ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button 
                  className="p-2 text-white/60 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiShare2} />
                </motion.button>
                
                <motion.button 
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiMoreHorizontal} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MusicPlayer;