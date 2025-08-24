import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { EnhancedMusicService } from '../../services/enhancedMusicService';
import { useAuth } from '../../contexts/AuthContext';

const { FiTrendingUp, FiDollarSign, FiMusic, FiUsers, FiEye, FiHeart, FiPlay } = FiIcons;

function CreatorDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await EnhancedMusicService.getUserDashboardStats(user.id);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-white/60">Loading dashboard...</div>
      </motion.div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-8">
        <div className="text-white/60">Unable to load dashboard data</div>
      </div>
    );
  }

  const { profile, stats } = dashboardData;

  const dashboardStats = [
    {
      icon: FiDollarSign,
      label: 'Total Earnings',
      value: `$${stats.total_earnings?.toFixed(2) || '0.00'}`,
      change: '+12.5%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiMusic,
      label: 'Total Tracks',
      value: profile.tracks_count || 0,
      change: '+3 this month',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiUsers,
      label: 'Followers',
      value: profile.followers_count?.toLocaleString() || '0',
      change: '+8.2%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiTrendingUp,
      label: 'Monthly Revenue',
      value: `$${stats.monthly_earnings?.toFixed(2) || '0.00'}`,
      change: '+15.7%',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Creator Dashboard</h1>
          <p className="text-white/60">Welcome back, {profile.display_name}!</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-white/5 rounded-xl border border-white/10">
          {[
            { key: '7d', label: '7D' },
            { key: '30d', label: '30D' },
            { key: '90d', label: '90D' },
            { key: '1y', label: '1Y' }
          ].map((range) => (
            <button
              key={range.key}
              className={`px-4 py-2 text-sm transition-all ${
                timeRange === range.key
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg'
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setTimeRange(range.key)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={index}
            className="card-3d p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <SafeIcon icon={stat.icon} className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-white/60 text-sm mb-2">{stat.label}</div>
            <div className="text-green-400 text-sm font-semibold flex items-center">
              <SafeIcon icon={FiTrendingUp} className="mr-1" />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <motion.div 
        className="card-3d p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-white mb-6">Revenue Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.earnings_by_source || {}).map(([source, amount], index) => (
            <motion.div
              key={source}
              className="bg-white/5 rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <div className="text-white/60 text-sm mb-1 capitalize">
                {source.replace('_', ' ')}
              </div>
              <div className="text-xl font-bold text-white">
                ${parseFloat(amount).toFixed(2)}
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ 
                    width: `${(amount / stats.total_earnings) * 100}%` 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div 
          className="card-3d p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Activity Summary</h3>
          <div className="space-y-4">
            {Object.entries(stats.activity_by_type || {}).map(([type, count], index) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <SafeIcon 
                      icon={type === 'play' ? FiPlay : type === 'like' ? FiHeart : FiEye} 
                      className="text-purple-400 text-sm" 
                    />
                  </div>
                  <span className="text-white capitalize">{type}s</span>
                </div>
                <span className="text-white font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="card-3d p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <motion.button 
              className="w-full btn-3d-primary flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiMusic} />
              <span>Upload New Track</span>
            </motion.button>
            
            <motion.button 
              className="w-full btn-3d-secondary flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiUsers} />
              <span>Manage Fans</span>
            </motion.button>
            
            <motion.button 
              className="w-full btn-3d-secondary flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiDollarSign} />
              <span>Withdraw Earnings</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CreatorDashboard;