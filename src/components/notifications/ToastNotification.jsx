import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiX, FiAlertTriangle, FiInfo, FiLoader, FiHeart, FiStar, FiZap } = FiIcons;

function ToastNotification({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onRemove,
  action,
  secondaryAction,
  persistent = false
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Show toast after mount
    setTimeout(() => setIsVisible(true), 100);

    if (!persistent && duration > 0) {
      // Start progress countdown
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 50));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 50);

      // Auto remove after duration
      const timer = setTimeout(() => {
        handleRemove();
      }, duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
      };
    }
  }, [duration, persistent]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: FiCheck,
          bgColor: 'from-green-500/25 to-emerald-500/25',
          borderColor: 'border-green-500/50',
          iconColor: 'text-green-400',
          progressColor: 'bg-green-500',
          glowColor: 'rgba(34,197,94,0.4)'
        };
      case 'error':
        return {
          icon: FiX,
          bgColor: 'from-red-500/25 to-pink-500/25',
          borderColor: 'border-red-500/50',
          iconColor: 'text-red-400',
          progressColor: 'bg-red-500',
          glowColor: 'rgba(239,68,68,0.4)'
        };
      case 'warning':
        return {
          icon: FiAlertTriangle,
          bgColor: 'from-yellow-500/25 to-orange-500/25',
          borderColor: 'border-yellow-500/50',
          iconColor: 'text-yellow-400',
          progressColor: 'bg-yellow-500',
          glowColor: 'rgba(245,158,11,0.4)'
        };
      case 'loading':
        return {
          icon: FiLoader,
          bgColor: 'from-blue-500/25 to-purple-500/25',
          borderColor: 'border-blue-500/50',
          iconColor: 'text-blue-400',
          progressColor: 'bg-blue-500',
          glowColor: 'rgba(59,130,246,0.4)'
        };
      default:
        return {
          icon: FiInfo,
          bgColor: 'from-blue-500/25 to-cyan-500/25',
          borderColor: 'border-blue-500/50',
          iconColor: 'text-blue-400',
          progressColor: 'bg-blue-500',
          glowColor: 'rgba(59,130,246,0.4)'
        };
    }
  };

  const config = getToastConfig();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-2xl shadow-2xl max-w-md w-full bg-gradient-to-r ${config.bgColor} ${config.borderColor}`}
          style={{
            boxShadow: `
              0 25px 50px rgba(0,0,0,0.5),
              0 10px 20px rgba(0,0,0,0.3),
              0 0 20px ${config.glowColor},
              inset 0 1px 0 rgba(255,255,255,0.1)
            `
          }}
          initial={{ opacity: 0, y: -60, x: 400, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, y: -30, x: 400, scale: 0.9, rotateY: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{
            scale: 1.02,
            y: -4,
            boxShadow: `
              0 30px 60px rgba(0,0,0,0.6),
              0 15px 25px rgba(0,0,0,0.4),
              0 0 30px ${config.glowColor}
            `
          }}
          layout
        >
          {/* Enhanced Progress Bar */}
          {!persistent && duration > 0 && (
            <motion.div
              className="absolute top-0 left-0 h-1.5 bg-white/20 w-full"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1 }}
            >
              <div className={`h-full ${config.progressColor} shadow-lg relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}

          <div className="p-6">
            <div className="flex items-start space-x-4">
              {/* Enhanced Icon */}
              <motion.div
                className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${config.iconColor} relative overflow-hidden`}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
                animate={type === 'loading' ? { rotate: 360 } : { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={type === 'loading' ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 2, repeat: Infinity }}
              >
                <SafeIcon icon={config.icon} className={`${config.iconColor} text-lg relative z-10`} />
                {/* Icon Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: config.glowColor }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Enhanced Content */}
              <div className="flex-1 min-w-0">
                {title && (
                  <motion.h4
                    className="text-white font-bold text-base mb-2 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h4>
                )}
                <motion.p
                  className="text-white/90 text-sm leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {message}
                </motion.p>

                {/* Action Buttons */}
                {(action || secondaryAction) && (
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Primary Action */}
                    {action && (
                      <motion.button
                        className="flex-1 text-sm font-bold px-4 py-2 rounded-xl transition-all relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg, rgba(239,68,68,0.9) 0%, rgba(220,38,38,0.8) 100%)',
                          border: '1px solid rgba(239,68,68,0.5)',
                          boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
                        }}
                        onClick={action.onClick}
                        whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(239,68,68,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white relative z-10">{action.label}</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.button>
                    )}

                    {/* Secondary Action */}
                    {secondaryAction && (
                      <motion.button
                        className="flex-1 text-sm font-bold px-4 py-2 rounded-xl transition-all relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                        onClick={secondaryAction.onClick}
                        whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-white relative z-10">{secondaryAction.label}</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Enhanced Close Button */}
              {!persistent && (
                <motion.button
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  onClick={handleRemove}
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SafeIcon icon={FiX} className="text-sm" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Enhanced Ambient Glow Effect */}
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${config.glowColor} 0%, transparent 70%)`
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Success Celebration Effects */}
          {type === 'success' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{ left: `${20 + i * 10}%`, top: '20%' }}
                  animate={{ y: [0, -20, 40], opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToastNotification;