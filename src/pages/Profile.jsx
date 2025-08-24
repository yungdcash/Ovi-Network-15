import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEdit, FiSettings, FiMusic, FiUsers, FiHeart, FiShare2, FiPlay, FiMoreHorizontal } = FiIcons;

function Profile() {
  const [activeTab, setActiveTab] = useState('tracks');

  const profileData = {
    name: 'Alex Producer',
    username: '@alexproducer',
    bio: 'Electronic music producer & DJ. Creating the future of sound with quantum beats and digital dreams. 🎵✨',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    verified: true,
    stats: {
      followers: '2.5M',
      following: '1.2K',
      tracks: '147',
      likes: '892K',
    },
    badges: ['Pro Creator', 'Top 1%', 'Verified Artist'],
  };

  const userTracks = [
    {
      id: 1,
      title: 'Quantum Synthesis',
      plays: '3.2M',
      likes: '245K',
      duration: '4:32',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      uploadDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Digital Dreams',
      plays: '2.1M',
      likes: '156K',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
      uploadDate: '1 week ago',
    },
    {
      id: 3,
      title: 'Neon Nights',
      plays: '1.8M',
      likes: '128K',
      duration: '5:12',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      uploadDate: '2 weeks ago',
    },
  ];

  const achievements = [
    {
      title: 'Platinum Producer',
      description: 'Earned over $100K in a single month',
      icon: FiMusic,
      color: 'from-yellow-400 to-orange-500',
      date: 'March 2024',
    },
    {
      title: 'Community Favorite',
      description: 'Track featured in top 10 for 30 days',
      icon: FiHeart,
      color: 'from-red-400 to-pink-500',
      date: 'February 2024',
    },
    {
      title: 'Viral Hit',
      description: 'Track reached 10M streams',
      icon: FiShare2,
      color: 'from-blue-400 to-purple-500',
      date: 'January 2024',
    },
  ];

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={profileData.coverImage} 
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Edit Cover Button */}
        <motion.button
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiEdit} />
        </motion.button>
      </div>

      {/* Profile Header */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-20 relative z-10">
          {/* Avatar */}
          <motion.div
            className="relative mb-4 md:mb-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 bg-black/50 backdrop-blur-sm">
              <img 
                src={profileData.avatar} 
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
            {profileData.verified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center border-2 border-gray-900">
                <span className="text-white text-sm">✓</span>
              </div>
            )}
          </motion.div>

          {/* Profile Info */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{profileData.name}</h1>
                <p className="text-gray-400 mb-2">{profileData.username}</p>
                <p className="text-gray-300 max-w-2xl">{profileData.bio}</p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {profileData.badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <motion.button
                  className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiEdit} className="mr-2" />
                  Edit Profile
                </motion.button>
                <motion.button
                  className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiSettings} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {Object.entries(profileData.stats).map(([key, value], index) => (
            <motion.div
              key={key}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
              <div className="text-gray-400 capitalize">{key}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <div className="flex space-x-8 border-b border-white/10 mb-8">
          {[
            { key: 'tracks', label: 'Tracks', icon: FiMusic },
            { key: 'achievements', label: 'Achievements', icon: FiHeart },
            { key: 'following', label: 'Following', icon: FiUsers },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              className={`flex items-center space-x-2 pb-4 border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-neon-blue text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.05 }}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'tracks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-full aspect-square object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.button
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SafeIcon icon={FiPlay} className="text-white text-xl ml-1" />
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold mb-2">{track.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>{track.plays} plays</span>
                    <span>{track.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-sm">{track.likes} likes</span>
                    <span className="text-gray-500 text-sm">{track.uploadDate}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mb-4`}>
                    <SafeIcon icon={achievement.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                  <span className="text-gray-500 text-xs">{achievement.date}</span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'following' && (
            <div className="text-center py-12">
              <SafeIcon icon={FiUsers} className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Following List</h3>
              <p className="text-gray-400">This feature is coming soon!</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;