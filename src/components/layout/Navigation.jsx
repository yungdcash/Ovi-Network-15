import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';
import RevolutionaryChat from '../chat/RevolutionaryChat';
import AdvancedSettingsModal from '../settings/AdvancedSettingsModal';

const {
  FiHome, FiCompass, FiMic, FiUsers, FiDollarSign, FiBarChart3, FiUser,
  FiMusic, FiMenu, FiX, FiLogOut, FiSettings, FiShield, FiGrid, FiMessageCircle
} = FiIcons;

function Navigation() {
  const { user, logout, securityLevel } = useAuth();
  const toast = useToastContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Home', color: 'from-emerald-400 to-emerald-300', description: 'Your luxury music hub' },
    { path: '/dashboard', icon: FiGrid, label: 'Dashboard', color: 'from-emerald-500 to-emerald-400', description: 'Creator insights' },
    { path: '/discover', icon: FiCompass, label: 'Discover', color: 'from-emerald-300 to-emerald-200', description: 'Find premium music' },
    { path: '/studio', icon: FiMic, label: 'Studio', color: 'from-emerald-600 to-emerald-500', description: 'Create & produce' },
    { path: '/social', icon: FiUsers, label: 'Social', color: 'from-emerald-400 to-emerald-300', description: 'Elite creator network' },
    { path: '/monetization', icon: FiDollarSign, label: 'Monetization', color: 'from-emerald-500 to-emerald-400', description: 'Premium earnings' },
    { path: '/analytics', icon: FiBarChart3, label: 'Analytics', color: 'from-emerald-300 to-emerald-200', description: 'Performance insights' },
    { path: '/profile', icon: FiUser, label: 'Profile', color: 'from-emerald-400 to-emerald-300', description: 'Your luxury profile' }
  ];

  const getSecurityBadge = () => {
    switch (securityLevel) {
      case 'biometric': return { text: 'BIOMETRIC', color: 'from-emerald-500 to-emerald-400' };
      case 'neural': return { text: 'NEURAL', color: 'from-emerald-600 to-emerald-500' };
      case 'quantum': return { text: 'QUANTUM', color: 'from-emerald-400 to-emerald-300' };
      default: return { text: 'STANDARD', color: 'from-emerald-500 to-emerald-400' };
    }
  };

  const securityBadge = getSecurityBadge();

  const handleLogout = async () => {
    toast.warning(
      'You are about to logout of your luxury account. Do you want to proceed?',
      {
        title: '🚪 Confirm Logout',
        duration: 0,
        persistent: true,
        action: {
          label: 'Yes, Logout',
          onClick: async () => {
            toast.removeAllToasts();
            const logoutToastId = toast.loading(
              'Signing you out securely and clearing your luxury session...',
              {
                title: '🔐 Logging Out',
                persistent: true
              }
            );
            try {
              await logout();
              setMobileMenuOpen(false);
              toast.removeToast(logoutToastId);
              toast.success(
                'You have been successfully logged out. Your luxury session has been cleared securely. Welcome back anytime! 💎',
                {
                  title: '✅ Logout Complete',
                  duration: 4000
                }
              );
            } catch (error) {
              toast.removeToast(logoutToastId);
              toast.error(
                'There was an issue logging you out. Please try again.',
                {
                  title: '❌ Logout Error',
                  duration: 5000,
                  action: {
                    label: 'Try Again',
                    onClick: handleLogout
                  }
                }
              );
            }
          }
        },
        secondaryAction: {
          label: 'Stay Premium',
          onClick: () => {
            toast.removeAllToasts();
            toast.info(
              'You\'re still logged in and ready to continue creating luxury music! 💎🎵',
              {
                title: '🎯 Staying Premium',
                duration: 3000
              }
            );
          }
        }
      }
    );
  };

  const handleSettings = () => {
    setShowAdvancedSettings(true);
    setMobileMenuOpen(false);
    toast.info(
      '⚙️ Luxury Settings panel opened! Configure your premium preferences, privacy, and emerald-grade security.',
      {
        title: '🛠️ Premium Settings',
        duration: 3000
      }
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden lg:flex fixed left-0 top-0 h-full w-80 nav-3d z-40"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          borderRight: '1px solid rgba(16, 185, 129, 0.08)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)'
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="flex flex-col w-full">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <motion.div
              className="flex items-center space-x-4 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border-gradient-3d"
                style={{
                  background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
              >
                <SafeIcon icon={FiMusic} className="text-white text-2xl relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-300/20 blur-xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-3d">Ovi Network</h1>
                <p className="text-xs text-white/60 font-medium">Luxury Platform</p>
              </div>
            </motion.div>

            {/* User Profile Section */}
            {user && (
              <motion.div
                className="card-3d p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'}
                      alt={user.name}
                      className="w-12 h-12 avatar-3d online"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate text-sm">{user.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${securityBadge.color} text-white font-bold animate-pulse-3d`}>
                        {securityBadge.text}
                      </span>
                      <SafeIcon icon={FiShield} className="text-emerald-400 text-xs" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`nav-item-3d group cursor-pointer ${isActive ? 'active' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            isActive 
                              ? `bg-gradient-to-r ${item.color}` 
                              : 'bg-white/10 group-hover:bg-white/20'
                          }`}
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <SafeIcon 
                            icon={item.icon} 
                            className={`text-lg ${
                              isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                            }`} 
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm ${
                            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                            {item.description}
                          </p>
                        </div>
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full animate-pulse-3d"
                          />
                        )}
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-white/10 space-y-3">
            <motion.button
              className="btn-3d-secondary w-full flex items-center justify-center space-x-3"
              onClick={handleSettings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiSettings} className="text-white/70" />
              <span className="text-white/80">Luxury Settings</span>
            </motion.button>

            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-pink-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={FiLogOut} />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-16 backdrop-professional border-b border-white/10 z-50 flex items-center justify-between px-4"
          style={{
            backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(31, 41, 31, 0.6) 50%, rgba(15, 15, 15, 0.8) 100%)'
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <SafeIcon icon={FiMusic} className="text-white text-lg" />
            </motion.div>
            <h1 className="text-lg font-bold text-gradient-3d">Ovi Network</h1>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mobile Revolutionary Chat Button */}
            <motion.button
              className="relative w-10 h-10 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-xl flex items-center justify-center shadow-xl border border-white/20"
              onClick={() => setShowMobileChat(!showMobileChat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: showMobileChat 
                  ? ['0 0 15px rgba(16,185,129,0.4)', '0 0 25px rgba(16,185,129,0.6)', '0 0 15px rgba(16,185,129,0.4)']
                  : ['0 0 8px rgba(16,185,129,0.3)', '0 0 20px rgba(16,185,129,0.5)', '0 0 8px rgba(16,185,129,0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SafeIcon icon={showMobileChat ? FiX : FiMessageCircle} className="text-white text-lg" />
              
              {/* Notification Badge */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">3</span>
              </motion.div>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-3d-secondary w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="text-white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Revolutionary Chat */}
        <AnimatePresence>
          {showMobileChat && (
            <div className="lg:hidden">
              <RevolutionaryChat 
                isMobile={true} 
                isOpen={showMobileChat} 
                onClose={() => setShowMobileChat(false)} 
              />
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                className="absolute top-16 left-0 right-0 bottom-0 backdrop-professional overflow-y-auto"
                style={{
                  backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                  background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(31, 41, 31, 0.6) 50%, rgba(15, 15, 15, 0.8) 100%)'
                }}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-6 space-y-4">
                  {/* Mobile Navigation Items */}
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div
                          className={`card-3d p-4 ${isActive ? 'border-emerald-500/30' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                              isActive 
                                ? `bg-gradient-to-r ${item.color}` 
                                : 'bg-white/10'
                            }`}>
                              <SafeIcon icon={item.icon} className="text-white text-lg" />
                            </div>
                            <div>
                              <p className="text-white font-semibold">{item.label}</p>
                              <p className="text-white/60 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}

                  {/* Mobile User Section */}
                  {user && (
                    <motion.div
                      className="card-3d p-4 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'}
                          alt={user.name}
                          className="w-12 h-12 avatar-3d online"
                        />
                        <div>
                          <p className="text-white font-semibold">{user.name}</p>
                          <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${securityBadge.color} text-white font-bold`}>
                            {securityBadge.text}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Advanced Settings Button */}
                      <motion.button
                        onClick={handleSettings}
                        className="w-full btn-3d-secondary flex items-center justify-center space-x-2 mb-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SafeIcon icon={FiSettings} />
                        <span>Luxury Settings</span>
                      </motion.button>

                      {/* Mobile Logout Button */}
                      <motion.button
                        onClick={handleLogout}
                        className="w-full btn-3d-secondary flex items-center justify-center space-x-2 text-red-400 border-red-500/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SafeIcon icon={FiLogOut} />
                        <span>Logout</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Settings Modal */}
      <AdvancedSettingsModal 
        isOpen={showAdvancedSettings} 
        onClose={() => setShowAdvancedSettings(false)} 
      />
    </>
  );
}

export default Navigation;