import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useToastContext } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const { FiPlay, FiUsers, FiHeart, FiGift, FiVideo, FiArrowRight, FiTrendingUp } = FiIcons;

function LiveStreams() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const { user } = useAuth();

  const liveStreams = [
    {
      id: 1,
      title: 'Beat Making Session - Lo-Fi Hip Hop',
      streamer: 'BeatMaster Pro',
      viewers: '12.5K',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      genre: 'Hip Hop',
      earnings: '$2,340',
      isLive: true,
      description: 'Creating chill beats live'
    },
    {
      id: 2,
      title: 'Live DJ Set - Electronic Vibes',
      streamer: 'DJ Neon',
      viewers: '8.2K',
      thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=300&fit=crop',
      genre: 'Electronic',
      earnings: '$1,890',
      isLive: true,
      description: 'Premium electronic mix'
    },
    {
      id: 3,
      title: 'Guitar Recording Session',
      streamer: 'Acoustic Soul',
      viewers: '5.7K',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
      genre: 'Acoustic',
      earnings: '$1,245',
      isLive: true,
      description: 'Intimate acoustic performance'
    },
  ];

  const handleWatchStream = (stream) => {
    toast.success(
      `📺 Joining ${stream.streamer}'s luxury live stream! Experience "${stream.title}" in premium quality.`,
      {
        title: '🎬 Live Stream Starting',
        duration: 4000,
        action: {
          label: 'Stream Features',
          onClick: () => {
            toast.info(
              '💎 Premium features: HD quality, interactive chat, real-time donations, and exclusive content!',
              {
                title: '✨ Premium Stream Features',
                duration: 5000
              }
            );
          }
        }
      }
    );

    // Simulate stream loading
    setTimeout(() => {
      toast.info(
        `🔴 Live stream simulation: "${stream.title}" by ${stream.streamer} - ${stream.viewers} viewers watching!`,
        {
          title: '📡 Stream Connected',
          duration: 3000,
          action: {
            label: 'Send Gift',
            onClick: () => {
              if (user) {
                toast.success(
                  `💝 Gift sent to ${stream.streamer}! Your support helps creators continue making premium content.`,
                  {
                    title: '🎁 Gift Delivered',
                    duration: 3000
                  }
                );
              } else {
                toast.warning('Sign in to send gifts and support creators!', {
                  title: '🔐 Authentication Required',
                  duration: 3000
                });
              }
            }
          }
        }
      );
    }, 1500);
  };

  const handleGoLive = () => {
    if (!user) {
      toast.warning(
        'Sign in to start your luxury live stream and earn from premium viewers!',
        {
          title: '🔐 Live Stream Access',
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
      '🚀 Preparing your luxury live stream setup! Premium streaming tools and monetization features loading...',
      {
        title: '📺 Going Live Soon',
        duration: 4000,
        action: {
          label: 'Stream Settings',
          onClick: () => {
            navigate('/studio');
            toast.info('Live streaming features available in the Studio!', {
              title: '🎙️ Studio Live Tools',
              duration: 3000
            });
          }
        }
      }
    );
  };

  const handleStreamAction = (stream, actionType) => {
    if (!user && actionType !== 'watch') {
      toast.warning(
        'Sign in to interact with live streams and support luxury creators!',
        {
          title: '🔐 Interaction Access',
          duration: 3000
        }
      );
      return;
    }

    const actions = {
      'like': () => {
        toast.success(
          `❤️ Liked ${stream.streamer}'s stream! Your support motivates creators to continue premium content.`,
          {
            title: '💖 Stream Liked',
            duration: 2000
          }
        );
      },
      'gift': () => {
        toast.success(
          `🎁 Gift sent to ${stream.streamer}! Premium creators love the support from luxury fans like you.`,
          {
            title: '💝 Gift Delivered',
            duration: 3000,
            action: {
              label: 'Send Another',
              onClick: () => handleStreamAction(stream, 'gift')
            }
          }
        );
      }
    };

    const action = actions[actionType];
    if (action) action();
  };

  return (
    <motion.div
      className="card-3d p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center animate-glow-3d">
            <SafeIcon icon={FiVideo} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Live Streams</h2>
            <p className="text-white/60 text-sm">Watch creators make luxury music in real-time</p>
          </div>
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
          onClick={handleGoLive}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiVideo} />
          <span>Go Live</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveStreams.map((stream, index) => (
          <motion.div
            key={stream.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleWatchStream(stream)}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />
              
              {/* Live Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                LIVE
              </div>
              
              {/* Viewer Count */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center">
                <SafeIcon icon={FiUsers} className="mr-1" />
                {stream.viewers}
              </div>
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.button
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiPlay} className="text-white text-2xl ml-1" />
                </motion.button>
              </div>
              
              {/* Earnings Overlay */}
              <div className="absolute bottom-3 right-3 bg-green-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                {stream.earnings} earned
              </div>
            </div>

            {/* Stream Info */}
            <div className="mt-4">
              <h3 className="text-white font-semibold mb-1 line-clamp-2">{stream.title}</h3>
              <p className="text-gray-400 text-sm mb-1">{stream.streamer}</p>
              <p className="text-gray-500 text-xs mb-2">{stream.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                  {stream.genre}
                </span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStreamAction(stream, 'like');
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <SafeIcon icon={FiHeart} className="text-sm" />
                  </motion.button>
                  <motion.button
                    className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStreamAction(stream, 'gift');
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <SafeIcon icon={FiGift} className="text-sm" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stream Stats */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {[
          { label: 'Live Streams', value: '1,247', color: 'text-red-400', icon: FiVideo },
          { label: 'Total Viewers', value: '89.3K', color: 'text-blue-400', icon: FiUsers },
          { label: 'Stream Revenue', value: '$45.2K', color: 'text-green-400', icon: FiDollarSign },
          { label: 'Active Creators', value: '2,891', color: 'text-purple-400', icon: FiStar },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            onClick={() => {
              toast.info(
                `📊 ${stat.label}: ${stat.value} - Part of our thriving luxury live streaming ecosystem!`,
                {
                  title: '📈 Stream Statistics',
                  duration: 3000,
                  action: {
                    label: 'View Details',
                    onClick: () => navigate('/analytics')
                  }
                }
              );
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <SafeIcon icon={stat.icon} className={`${stat.color} text-xl`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Call-to-Action */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiVideo} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Start Your Premium Live Stream</h3>
              <p className="text-white/70 text-sm">
                Broadcast to thousands of luxury music fans and earn premium revenue from your performances
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2"
              onClick={handleGoLive}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiVideo} />
              <span>Go Live Now</span>
            </motion.button>
            
            <motion.button
              className="btn-3d-secondary flex items-center space-x-2 px-6 py-3"
              onClick={() => {
                toast.info(
                  '📚 Opening live streaming guide with premium tips, monetization strategies, and luxury audience building!',
                  {
                    title: '📖 Streaming Guide',
                    duration: 4000,
                    action: {
                      label: 'View Guide',
                      onClick: () => {
                        navigate('/monetization');
                        toast.success('Live streaming monetization guide opened!', {
                          title: '💰 Monetization Guide',
                          duration: 2000
                        });
                      }
                    }
                  }
                );
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
              <SafeIcon icon={FiArrowRight} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LiveStreams;