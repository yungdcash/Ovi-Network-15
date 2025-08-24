import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useToastContext } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const { FiUserPlus, FiMusic, FiTrendingUp, FiDollarSign, FiStar, FiArrowRight, FiUsers } = FiIcons;

function CreatorSpotlight() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const { user } = useAuth();

  const featuredCreators = [
    {
      id: 1,
      name: 'NeuroWave',
      genre: 'Electronic',
      followers: '2.5M',
      monthlyEarnings: '$45K',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      verified: true,
      trending: true,
      rating: 4.9,
      description: 'Quantum beats and digital soundscapes'
    },
    {
      id: 2,
      name: 'CyberSonic',
      genre: 'Synthwave',
      followers: '1.8M',
      monthlyEarnings: '$32K',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
      verified: true,
      trending: false,
      rating: 4.7,
      description: 'Retro-futuristic synthwave vibes'
    },
    {
      id: 3,
      name: 'ElectroVibe',
      genre: 'Techno',
      followers: '3.2M',
      monthlyEarnings: '$58K',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      verified: true,
      trending: true,
      rating: 4.8,
      description: 'High-energy techno for the dance floor'
    },
  ];

  const handleFollowCreator = (creator) => {
    if (!user) {
      toast.warning(
        `Sign in to follow ${creator.name} and get notified about their latest luxury tracks!`,
        {
          title: '🔐 Authentication Required',
          duration: 4000,
          action: {
            label: 'Sign In',
            onClick: () => {
              toast.info('Authentication modal will open automatically.', {
                title: '🚪 Opening Sign In',
                duration: 2000
              });
            }
          }
        }
      );
      return;
    }

    toast.success(
      `🎉 You're now following ${creator.name}! You'll be notified about their latest luxury releases and exclusive content.`,
      {
        title: '👑 Following Elite Creator',
        duration: 4000,
        action: {
          label: 'View Profile',
          onClick: () => {
            navigate('/profile');
            toast.info(`Opening ${creator.name}'s luxury profile...`, {
              title: '👤 Creator Profile',
              duration: 2000
            });
          }
        }
      }
    );
  };

  const handleListenToCreator = (creator) => {
    toast.success(
      `🎧 Loading ${creator.name}'s premium tracks! Get ready for luxury ${creator.genre} experience.`,
      {
        title: '🎵 Premium Playback',
        duration: 3000,
        action: {
          label: 'Discover More',
          onClick: () => {
            navigate('/discover');
          }
        }
      }
    );

    // Simulate playing creator's track
    const mockTrack = {
      id: `creator-${creator.id}`,
      title: `${creator.genre} Masterpiece`,
      artist: creator.name,
      cover: creator.avatar,
      duration: '4:32'
    };

    // Simulate track loading delay
    setTimeout(() => {
      // Note: You would set actual track here
      toast.info(
        `🎵 Playing sample track from ${creator.name} - Premium tracks available in Discover section!`,
        {
          title: '🎧 Sample Playback',
          duration: 4000
        }
      );
    }, 1000);
  };

  const handleDiscoverMore = () => {
    toast.info(
      '🌟 Opening the complete creator directory with elite artists, luxury producers, and premium collaborators!',
      {
        title: '👑 Elite Creator Directory',
        duration: 3000
      }
    );
    
    setTimeout(() => {
      navigate('/social');
    }, 500);
  };

  const handleBecomeCreator = () => {
    if (!user) {
      toast.warning(
        'Sign in to apply for our exclusive creator program and unlock premium monetization features!',
        {
          title: '🔐 Creator Program Access',
          duration: 5000,
          action: {
            label: 'Sign In',
            onClick: () => {
              toast.info('Authentication modal will open automatically.', {
                title: '🚪 Opening Sign In',
                duration: 2000
              });
            }
          }
        }
      );
      return;
    }

    toast.success(
      '🚀 Opening creator program application! Join thousands of elite artists earning premium revenue on Ovi Network.',
      {
        title: '⭐ Elite Creator Program',
        duration: 4000,
        action: {
          label: 'Start Application',
          onClick: () => {
            navigate('/monetization');
            toast.info('Creator program details and application form loading...', {
              title: '📋 Application Portal',
              duration: 3000
            });
          }
        }
      }
    );
  };

  return (
    <motion.div
      className="card-3d p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-glow-3d">
            <SafeIcon icon={FiStar} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Creator Spotlight</h2>
            <p className="text-white/60 text-sm">Elite performing artists</p>
          </div>
        </div>
        
        <motion.button 
          className="btn-3d-secondary text-sm flex items-center space-x-2 group"
          onClick={handleDiscoverMore}
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Discover More</span>
          <SafeIcon icon={FiArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {featuredCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 avatar-3d online">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              {creator.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              {creator.trending && (
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SafeIcon icon={FiTrendingUp} className="text-white text-xs" />
                </motion.div>
              )}
            </div>

            {/* Creator Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-semibold">{creator.name}</h3>
                {creator.trending && (
                  <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                    Trending
                  </span>
                )}
              </div>
              <p className="text-white/60 text-sm mb-1">{creator.genre}</p>
              <p className="text-white/50 text-xs mb-2">{creator.description}</p>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-xs">
                <span className="text-white/50 flex items-center">
                  <SafeIcon icon={FiUsers} className="mr-1" />
                  {creator.followers}
                </span>
                <span className="text-green-400 flex items-center font-semibold">
                  <SafeIcon icon={FiDollarSign} className="mr-1" />
                  {creator.monthlyEarnings}
                </span>
                <div className="flex items-center">
                  <SafeIcon icon={FiStar} className="text-yellow-400 mr-1" />
                  <span className="text-yellow-400 font-semibold">{creator.rating}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              <motion.button
                className="btn-3d-primary flex items-center space-x-2 text-sm px-4 py-2"
                onClick={() => handleFollowCreator(creator)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiUserPlus} className="text-sm" />
                <span>Follow</span>
              </motion.button>
              
              <motion.button
                className="btn-3d-secondary flex items-center space-x-2 text-sm px-4 py-2"
                onClick={() => handleListenToCreator(creator)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiMusic} className="text-sm" />
                <span>Listen</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-white font-semibold mb-2 flex items-center">
          <SafeIcon icon={FiStar} className="mr-2 text-yellow-400" />
          Become a Featured Creator
        </h3>
        <p className="text-white/70 text-sm mb-3">
          Join our exclusive creator program and unlock premium monetization features, AI-powered tools, and emerald-grade promotion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button 
            className="btn-3d-primary w-full sm:w-auto flex items-center justify-center space-x-2"
            onClick={handleBecomeCreator}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiStar} />
            <span>Apply Now</span>
          </motion.button>
          
          <motion.button
            className="btn-3d-secondary w-full sm:w-auto flex items-center justify-center space-x-2"
            onClick={handleDiscoverMore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiUsers} />
            <span>View All Creators</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CreatorSpotlight;