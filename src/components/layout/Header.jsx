import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import NotificationSystem from '../notifications/NotificationSystem';
import RevolutionaryChat from '../chat/RevolutionaryChat';

const { FiSearch, FiSettings, FiUser, FiMic, FiVideo, FiDollarSign, FiPlus } = FiIcons;

function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      className="hidden lg:block fixed top-0 left-80 right-0 h-16 backdrop-professional border-b border-white/10 px-6 z-30"
      style={{
        backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(31, 41, 31, 0.6) 50%, rgba(15, 15, 15, 0.8) 100%)'
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between h-full">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <SafeIcon 
              icon={FiSearch} 
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                searchFocused ? 'text-emerald-400' : 'text-white/40'
              }`} 
            />
            <input
              type="text"
              placeholder="Search luxury artists, premium tracks, exclusive playlists..."
              className="input-3d w-full pl-12 pr-4"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <motion.button
              className="btn-3d-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Create Luxury Content"
            >
              <SafeIcon icon={FiPlus} />
              <span className="hidden sm:inline">Create</span>
            </motion.button>

            <motion.button
              className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl hover:from-red-500/30 hover:to-pink-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Go Live Premium"
            >
              <SafeIcon icon={FiVideo} className="text-red-400" />
            </motion.button>

            <motion.button
              className="p-3 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 rounded-xl hover:from-emerald-500/30 hover:to-emerald-400/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Luxury Recording"
            >
              <SafeIcon icon={FiMic} className="text-emerald-400" />
            </motion.button>

            <motion.button
              className="p-3 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-600/30 rounded-xl hover:from-emerald-600/30 hover:to-emerald-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Premium Monetization"
            >
              <SafeIcon icon={FiDollarSign} className="text-emerald-300" />
            </motion.button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10" />

          {/* Revolutionary Chat System - Moved here */}
          <RevolutionaryChat />

          {/* Notifications */}
          <NotificationSystem />

          {/* Settings */}
          <motion.button
            className="p-3 hover:bg-white/5 rounded-xl transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiSettings} className="text-white/70 text-xl" />
          </motion.button>

          {/* Profile */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/5 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 avatar-3d online">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-semibold text-white">Alex Producer</p>
              <p className="text-xs text-white/60">Luxury Creator</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;