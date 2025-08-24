import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import TrackPlayer from '../music/TrackPlayer';
import { EnhancedMusicService } from '../../services/enhancedMusicService';
import { useAuth } from '../../contexts/AuthContext';

const { FiRefreshCw, FiStar, FiZap } = FiIcons;

function PersonalizedFeed({ setCurrentTrack, setIsPlaying }) {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const data = await EnhancedMusicService.getPersonalizedRecommendations(user.id, 12);
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRecommendations();
    setRefreshing(false);
  };

  const handlePlayTrack = async (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Record the play event with enhanced analytics
    await EnhancedMusicService.recordDetailedAnalytics(
      track.id,
      user.id,
      'play',
      {
        source: 'personalized_feed',
        recommendation_score: track.recommendation_score
      }
    );
  };

  if (!user) {
    return (
      <motion.div 
        className="card-3d p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SafeIcon icon={FiStar} className="text-4xl text-white/40 mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">Sign In for Personalized Recommendations</h3>
        <p className="text-white/60">Get music recommendations tailored just for you</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card-3d p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiZap} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
            <p className="text-white/60 text-sm">AI-powered music discovery</p>
          </div>
        </div>
        
        <motion.button
          className="btn-3d-secondary flex items-center space-x-2"
          onClick={handleRefresh}
          disabled={refreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon 
            icon={FiRefreshCw} 
            className={refreshing ? 'animate-spin' : ''} 
          />
          <span>Refresh</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="loading-3d bg-white/5 rounded-xl h-64" />
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((track, index) => (
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
              {/* Recommendation Score (for debugging) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-white/40 mt-2 text-center">
                  Score: {track.recommendation_score?.toFixed(1)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SafeIcon icon={FiStar} className="text-4xl text-white/40 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">No Recommendations Yet</h3>
          <p className="text-white/60 mb-4">
            Listen to some tracks to help us learn your preferences
          </p>
          <button 
            className="btn-3d-primary"
            onClick={() => window.location.hash = '/discover'}
          >
            Discover Music
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default PersonalizedFeed;