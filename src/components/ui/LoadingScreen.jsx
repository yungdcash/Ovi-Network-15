import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiZap, FiMusic, FiCpu, FiShield } = FiIcons;

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-800 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-3xl flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              borderRadius: ["30%", "50%", "30%"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SafeIcon icon={FiMusic} className="text-white text-3xl" />
          </motion.div>
          
          {/* Orbiting Elements */}
          {[FiZap, FiCpu, FiShield].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos(i * 120 * Math.PI / 180) * 50],
                y: [0, Math.sin(i * 120 * Math.PI / 180) * 50],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            >
              <SafeIcon icon={Icon} className="text-white text-xs" />
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Text */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Ovi Network
        </motion.h1>
        <motion.p
          className="text-white/60 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Initializing Luxury Music Platform...
        </motion.p>

        {/* Loading Progress */}
        <div className="w-64 mx-auto">
          <motion.div
            className="h-1 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
          {/* Loading Text */}
          <motion.div
            className="mt-4 text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Loading luxury features...
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;