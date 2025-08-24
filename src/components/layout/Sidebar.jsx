import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiHome, FiCompass, FiMic, FiUsers, FiDollarSign, FiBarChart3, FiUser, FiMusic, FiChevronLeft, FiChevronRight } = FiIcons;

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Home', color: 'text-neon-blue' },
    { path: '/discover', icon: FiCompass, label: 'Discover', color: 'text-neon-purple' },
    { path: '/studio', icon: FiMic, label: 'Quantum Studio', color: 'text-neon-pink' },
    { path: '/social', icon: FiUsers, label: 'Social Hub', color: 'text-neon-green' },
    { path: '/monetization', icon: FiDollarSign, label: 'Creator Economy', color: 'text-yellow-400' },
    { path: '/analytics', icon: FiBarChart3, label: 'Analytics', color: 'text-orange-400' },
    { path: '/profile', icon: FiUser, label: 'Profile', color: 'text-cyan-400' },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-black/50 backdrop-blur-xl border-r border-white/10 z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <SafeIcon icon={FiMusic} className="text-white text-xl" />
          </motion.div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                MusicVerse
              </h1>
              <p className="text-xs text-gray-400">Revolutionary Platform</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors"
      >
        <SafeIcon icon={collapsed ? FiChevronRight : FiChevronLeft} className="text-white text-xs" />
      </button>

      {/* Navigation */}
      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`mx-2 mb-2 p-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-white/20'
                    : 'hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <div className="flex items-center space-x-3 relative z-10">
                  <SafeIcon
                    icon={item.icon}
                    className={`text-xl ${isActive ? item.color : 'text-gray-400'} transition-colors`}
                  />
                  {!collapsed && (
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      {!collapsed && (
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 rounded-lg border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Go Premium</h3>
            <p className="text-xs text-gray-400 mb-3">
              Unlock unlimited features and monetization tools
            </p>
            <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Sidebar;