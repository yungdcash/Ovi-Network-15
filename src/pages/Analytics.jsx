import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiUsers, FiMusic, FiEye, FiHeart, FiShare2, FiDownload, FiCalendar } = FiIcons;

function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const overviewStats = [
    {
      icon: FiUsers,
      label: 'Total Listeners',
      value: '2.5M',
      change: '+12.5%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiMusic,
      label: 'Streams',
      value: '45.2M',
      change: '+8.3%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiHeart,
      label: 'Likes',
      value: '892K',
      change: '+15.7%',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: FiShare2,
      label: 'Shares',
      value: '156K',
      change: '+22.1%',
      color: 'from-green-500 to-teal-500',
    },
  ];

  const topTracks = [
    {
      title: 'Quantum Synthesis',
      artist: 'NeuroWave',
      streams: '3.2M',
      growth: '+15%',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop',
    },
    {
      title: 'Digital Dreams',
      artist: 'CyberSonic',
      streams: '2.1M',
      growth: '+8%',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=150&h=150&fit=crop',
    },
    {
      title: 'Neon Nights',
      artist: 'ElectroVibe',
      streams: '1.8M',
      growth: '+12%',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop',
    },
  ];

  const audienceData = [
    { country: 'United States', percentage: 35, listeners: '875K' },
    { country: 'United Kingdom', percentage: 18, listeners: '450K' },
    { country: 'Germany', percentage: 12, listeners: '300K' },
    { country: 'Canada', percentage: 10, listeners: '250K' },
    { country: 'Australia', percentage: 8, listeners: '200K' },
  ];

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Deep insights into your music performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex bg-white/5 rounded-lg border border-white/10">
            {[
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' },
              { key: '90d', label: '90 Days' },
              { key: '1y', label: '1 Year' },
            ].map((range) => (
              <button
                key={range.key}
                className={`px-4 py-2 text-sm transition-all ${
                  timeRange === range.key
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setTimeRange(range.key)}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <motion.button
            className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiDownload} className="mr-2" />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Overview Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {overviewStats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <SafeIcon icon={stat.icon} className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
            <div className="flex items-center text-green-400 text-sm">
              <SafeIcon icon={FiTrendingUp} className="mr-1" />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Streams Chart */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Stream Analytics</h2>
            <SafeIcon icon={FiTrendingUp} className="text-neon-blue" />
          </div>
          
          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-t from-neon-blue/10 to-transparent rounded-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-neon-blue to-neon-purple rounded-t-lg"
                  style={{ 
                    width: '12%', 
                    height: `${Math.random() * 80 + 20}%`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between text-sm text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </motion.div>

        {/* Audience Demographics */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Countries</h2>
            <SafeIcon icon={FiUsers} className="text-neon-purple" />
          </div>
          
          <div className="space-y-4">
            {audienceData.map((country, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{country.country}</span>
                    <span className="text-gray-400 text-sm">{country.listeners}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${country.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
                <span className="text-gray-400 text-sm w-12 text-right">{country.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Tracks */}
      <motion.div
        className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-white mb-6">Top Performing Tracks</h2>
        
        <div className="space-y-4">
          {topTracks.map((track, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <span className="text-gray-400 font-bold text-lg w-8">#{index + 1}</span>
              
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img 
                  src={track.cover} 
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-semibold">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              
              <div className="text-right">
                <div className="text-white font-semibold">{track.streams}</div>
                <div className="text-green-400 text-sm">{track.growth}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiEye} />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiDownload} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-time Activity */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Live Listeners</h3>
          <div className="text-3xl font-bold text-neon-blue mb-2">1,247</div>
          <p className="text-gray-400 text-sm">Currently listening</p>
        </div>
        
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="text-3xl font-bold text-neon-purple mb-2">+89</div>
          <p className="text-gray-400 text-sm">New followers today</p>
        </div>
        
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Engagement Rate</h3>
          <div className="text-3xl font-bold text-neon-green mb-2">12.5%</div>
          <p className="text-gray-400 text-sm">Average engagement</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Analytics;