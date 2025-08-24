import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiUserPlus, FiMusic, FiVideo, FiMic } = FiIcons;

function Social() {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      user: {
        name: 'NeuroWave',
        username: '@neurowave',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        verified: true,
      },
      content: 'Just dropped my latest track "Quantum Synthesis"! This one took 3 months to perfect. What do you think? 🎵',
      media: {
        type: 'audio',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
        title: 'Quantum Synthesis',
        duration: '4:32',
      },
      stats: {
        likes: 2847,
        comments: 156,
        shares: 89,
      },
      timestamp: '2h ago',
    },
    {
      id: 2,
      user: {
        name: 'DJ Neon',
        username: '@djneon',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        verified: true,
      },
      content: 'Live streaming tonight at 8PM! Going to be mixing some unreleased tracks. See you there! 🔥',
      media: {
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=500&h=300&fit=crop',
        title: 'Live DJ Set Preview',
        duration: '2:15',
      },
      stats: {
        likes: 1432,
        comments: 87,
        shares: 45,
      },
      timestamp: '4h ago',
    },
  ];

  const trendingTopics = [
    '#QuantumBeats',
    '#ElectronicMusic',
    '#NewRelease',
    '#LiveStream',
    '#Producer',
  ];

  const suggestedUsers = [
    {
      name: 'BeatMaster Pro',
      username: '@beatmaster',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      followers: '1.2M',
      genre: 'Hip Hop',
    },
    {
      name: 'Synth Queen',
      username: '@synthqueen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      followers: '856K',
      genre: 'Synthwave',
    },
  ];

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Social Hub</h1>
          <p className="text-gray-400">Connect with creators and discover new music</p>
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Post
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex space-x-6 mb-6">
            {[
              { key: 'feed', label: 'For You' },
              { key: 'following', label: 'Following' },
              { key: 'trending', label: 'Trending' },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                className={`pb-2 border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-neon-blue text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: 1.05 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-semibold">{post.user.name}</h3>
                        {post.user.verified && (
                          <div className="w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{post.user.username} • {post.timestamp}</p>
                    </div>
                  </div>
                  
                  <motion.button
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiMoreHorizontal} />
                  </motion.button>
                </div>

                {/* Post Content */}
                <p className="text-white mb-4">{post.content}</p>

                {/* Media */}
                {post.media && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-800">
                    <div className="relative">
                      <img 
                        src={post.media.thumbnail} 
                        alt={post.media.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <motion.button
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SafeIcon 
                            icon={post.media.type === 'video' ? FiVideo : FiMusic} 
                            className="text-white text-2xl ml-1" 
                          />
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-medium">{post.media.title}</h4>
                      <p className="text-gray-400 text-sm">{post.media.duration}</p>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiHeart} />
                      <span className="text-sm">{post.stats.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiMessageCircle} />
                      <span className="text-sm">{post.stats.comments}</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SafeIcon icon={FiShare2} />
                      <span className="text-sm">{post.stats.shares}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Trending</h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-neon-blue font-medium">{topic}</span>
                  <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 50) + 10}K</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Suggested Users */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Suggested for you</h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{user.name}</h4>
                    <p className="text-gray-400 text-xs">{user.followers} • {user.genre}</p>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-neon-blue to-neon-purple px-3 py-1 rounded-full text-white text-sm hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiUserPlus} className="mr-1" />
                    Follow
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                <SafeIcon icon={FiVideo} className="mr-2" />
                Go Live
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                <SafeIcon icon={FiMic} className="mr-2" />
                Record
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Social;