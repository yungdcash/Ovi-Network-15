import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useToastContext } from '../../contexts/ToastContext';

const { FiUsers, FiMusic, FiDollarSign, FiTrendingUp, FiArrowRight, FiBarChart3 } = FiIcons;

function QuickStats() {
  const navigate = useNavigate();
  const toast = useToastContext();

  const stats = [
    {
      icon: FiUsers,
      label: 'Active Creators',
      value: '2.5M+',
      change: '+12%',
      color: 'from-blue-500 to-cyan-500',
      description: 'Elite music creators worldwide',
      action: 'social'
    },
    {
      icon: FiMusic,
      label: 'Luxury Tracks',
      value: '45M+',
      change: '+8%',
      color: 'from-purple-500 to-pink-500',
      description: 'Premium tracks created',
      action: 'discover'
    },
    {
      icon: FiDollarSign,
      label: 'Creator Earnings',
      value: '$125M+',
      change: '+25%',
      color: 'from-green-500 to-emerald-500',
      description: 'Total premium revenue earned',
      action: 'monetization'
    },
    {
      icon: FiTrendingUp,
      label: 'Monthly Growth',
      value: '18%',
      change: '+3%',
      color: 'from-orange-500 to-red-500',
      description: 'Platform expansion rate',
      action: 'analytics'
    },
  ];

  const handleStatClick = (stat) => {
    const statActions = {
      'social': () => {
        toast.success(
          '👥 Opening Elite Social Network! Connect with 2.5M+ luxury creators and premium music fans.',
          {
            title: '🌐 Social Hub',
            duration: 3000
          }
        );
        setTimeout(() => navigate('/social'), 500);
      },
      'discover': () => {
        toast.success(
          '🎵 Opening Premium Music Library! Explore 45M+ luxury tracks from elite creators worldwide.',
          {
            title: '🔍 Music Discovery',
            duration: 3000
          }
        );
        setTimeout(() => navigate('/discover'), 500);
      },
      'monetization': () => {
        toast.success(
          '💰 Opening Creator Economy Hub! Discover how $125M+ has been earned by luxury creators.',
          {
            title: '💎 Monetization Center',
            duration: 3000
          }
        );
        setTimeout(() => navigate('/monetization'), 500);
      },
      'analytics': () => {
        toast.success(
          '📊 Opening Growth Analytics! See detailed insights into our 18% monthly luxury expansion.',
          {
            title: '📈 Analytics Dashboard',
            duration: 3000
          }
        );
        setTimeout(() => navigate('/analytics'), 500);
      }
    };

    const action = statActions[stat.action];
    if (action) action();
  };

  return (
    <motion.div
      className="stats-grid"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="card-3d p-4 md:p-6 hover-lift text-center cursor-pointer group relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          onClick={() => handleStatClick(stat)}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 animate-glow-3d mx-auto group-hover:scale-110 transition-transform`}>
            <SafeIcon icon={stat.icon} className="text-white text-lg md:text-xl" />
          </div>
          
          <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
            {stat.value}
          </div>
          
          <div className="text-white/60 text-sm mb-3">{stat.label}</div>
          
          <div className="text-white/50 text-xs mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
            {stat.description}
          </div>
          
          <div className="flex items-center justify-center text-green-400 text-sm font-semibold">
            <SafeIcon icon={FiTrendingUp} className="mr-1" />
            {stat.change} this month
          </div>

          {/* Interactive Arrow */}
          <motion.div
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ x: 2 }}
          >
            <SafeIcon icon={FiArrowRight} className="text-white/60 text-sm" />
          </motion.div>

          {/* Click Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-2xl opacity-0 group-active:opacity-100"
            initial={{ scale: 0.8 }}
            whileTap={{ scale: 1.2, opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.4 }}
          />

          {/* Hover Glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default QuickStats;