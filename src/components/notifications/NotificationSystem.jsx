import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { EnhancedMusicService } from '../../services/enhancedMusicService';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';

const { FiBell, FiHeart, FiUserPlus, FiMusic, FiX, FiCheck } = FiIcons;

function NotificationSystem() {
  const { user } = useAuth();
  const toast = useToastContext();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Subscribe to real-time notifications
      const channel = EnhancedMusicService.subscribeToUserNotifications(
        user.id,
        handleNewNotification
      );

      return () => {
        channel.unsubscribe();
      };
    }
  }, [user]);

  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep max 50 notifications
    setUnreadCount(prev => prev + 1);

    // Show toast notification with enhanced styling
    const notificationConfig = {
      like: {
        type: 'success',
        title: 'New Like! ❤️',
        message: notification.message,
        duration: 4000
      },
      follow: {
        type: 'info',
        title: 'New Follower! 👤',
        message: notification.message,
        duration: 4000
      },
      comment: {
        type: 'info',
        title: 'New Comment! 💬',
        message: notification.message,
        duration: 4000
      },
      default: {
        type: 'info',
        title: 'Notification',
        message: notification.message,
        duration: 4000
      }
    };

    const config = notificationConfig[notification.type] || notificationConfig.default;
    toast.addToast(config);
  };

  const markAsRead = (index) => {
    setNotifications(prev => 
      prev.map((notif, i) => 
        i === index ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
    
    toast.success('All notifications marked as read', {
      title: 'Notifications',
      duration: 2000
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    
    toast.info('All notifications cleared', {
      title: 'Notifications',
      duration: 2000
    });
  };

  if (!user) return null;

  return (
    <>
      {/* Notification Bell */}
      <motion.button
        className="relative p-3 hover:bg-white/5 rounded-xl transition-colors"
        onClick={() => setShowNotifications(!showNotifications)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={FiBell} className="text-white/70 text-xl" />
        {unreadCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="absolute top-16 right-0 w-96 max-w-sm bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-50"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {notifications.length > 0 && (
                    <motion.button
                      className="text-blue-400 hover:text-blue-300 text-sm"
                      onClick={markAllAsRead}
                      whileHover={{ scale: 1.05 }}
                    >
                      Mark all read
                    </motion.button>
                  )}
                  <motion.button
                    className="text-white/60 hover:text-white"
                    onClick={() => setShowNotifications(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiX} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="p-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                        notification.read 
                          ? 'bg-white/5 hover:bg-white/10' 
                          : 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30'
                      }`}
                      onClick={() => markAsRead(index)}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'like' ? 'bg-red-500/20 text-red-400' :
                          notification.type === 'follow' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          <SafeIcon 
                            icon={
                              notification.type === 'like' ? FiHeart :
                              notification.type === 'follow' ? FiUserPlus : 
                              FiMusic
                            } 
                            className="text-sm" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">{notification.message}</p>
                          <p className="text-white/40 text-xs mt-1">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <SafeIcon icon={FiBell} className="text-4xl text-white/40 mx-auto mb-3" />
                  <p className="text-white/60">No notifications yet</p>
                  <p className="text-white/40 text-sm mt-1">
                    We'll notify you when something happens
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-white/10">
                <motion.button
                  className="w-full text-center text-red-400 hover:text-red-300 text-sm"
                  onClick={clearNotifications}
                  whileHover={{ scale: 1.02 }}
                >
                  Clear all notifications
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NotificationSystem;