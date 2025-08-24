import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { MusicService } from '../../services/musicService';
import { useSupabase } from '../../hooks/useSupabase';

const { FiPlay, FiPause, FiHeart, FiShare2, FiDownload } = FiIcons;

function TrackPlayer({ track, onPlay, isPlaying }) {
  const { user } = useSupabase();
  const [isLiked, setIsLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(track?.likes_count || 0);
  const [localPlaysCount, setLocalPlaysCount] = useState(track?.plays_count || 0);

  useEffect(() => {
    if (track) {
      setLocalLikesCount(track.likes_count || 0);
      setLocalPlaysCount(track.plays_count || 0);
    }
  }, [track]);

  const handlePlay = async () => {
    if (track && user) {
      const success = await MusicService.playTrack(track.id, user.id);
      if (success) {
        setLocalPlaysCount(prev => prev + 1);
        onPlay(track);
      }
    } else if (track) {
      // Play without analytics for non-logged-in users
      onPlay(track);
    }
  };

  const handleLike = async () => {
    if (!user || !track) return;

    const liked = await MusicService.likeTrack(track.id, user.id);
    setIsLiked(liked);
    setLocalLikesCount(prev => liked ? prev + 1 : prev - 1);
  };

  const handleShare = async () => {
    if (navigator.share && track) {
      try {
        await navigator.share({
          title: track.title,
          text: `Check out "${track.title}" by ${track.profiles_ovi2025?.display_name}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }

    if (user && track) {
      await MusicService.recordAnalytics(track.id, user.id, 'share');
    }
  };

  if (!track) return null;

  return (
    <motion.div 
      className="card-3d p-4 hover-lift cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Track Cover */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={track.cover_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'} 
          alt={track.title}
          className="w-full aspect-square object-cover transition-transform group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.button 
            className="w-16 h-16 btn-3d-primary rounded-full flex items-center justify-center"
            onClick={handlePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="text-white text-2xl ml-1" />
          </motion.button>
        </div>

        {/* Trending Badge */}
        {track.is_trending && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              TRENDING
            </span>
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">{track.title}</h3>
        <p className="text-white/60 text-sm mb-2">
          {track.profiles_ovi2025?.display_name || 'Unknown Artist'}
        </p>
        
        {/* Genre & Duration */}
        <div className="flex items-center justify-between text-xs text-white/40 mb-3">
          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
            {track.genre || 'Electronic'}
          </span>
          <span>
            {Math.floor((track.duration || 0) / 60)}:
            {String((track.duration || 0) % 60).padStart(2, '0')}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-white/60 mb-3">
          <span>{localPlaysCount.toLocaleString()} plays</span>
          <span>{localLikesCount.toLocaleString()} likes</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button 
            className={`p-2 rounded-lg transition-all ${
              isLiked 
                ? 'text-red-400 bg-red-500/20' 
                : 'text-white/60 hover:text-red-400 hover:bg-red-500/20'
            }`}
            onClick={handleLike}
            disabled={!user}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiHeart} className={isLiked ? 'fill-current' : ''} />
          </motion.button>

          <motion.button 
            className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiShare2} />
          </motion.button>

          <motion.button 
            className="p-2 text-white/60 hover:text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiDownload} />
          </motion.button>
        </div>

        {/* Artist Info */}
        {track.profiles_ovi2025?.verified && (
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default TrackPlayer;