import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

function MainLayout({ children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f1f0f] text-white relative overflow-hidden">
      {/* Luxury Ambient Background - Optimized */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-emerald-900/10 to-gray-800/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Optimized Floating Orbs */}
      <motion.div
        className="fixed top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-emerald-400/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Navigation */}
      {user && <Navigation />}

      {/* Header */}
      {user && <Header />}

      {/* Main Content */}
      <motion.main
        className={`${user ? 'lg:ml-80 pt-20 lg:pt-4' : ''} min-h-screen relative z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-6 max-w-full overflow-x-hidden">
          {children}
        </div>
      </motion.main>

      {/* Optimized Professional Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Optimized Energy Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
            style={{
              width: '200%',
              top: `${30 + i * 30}%`,
              left: '-50%',
            }}
            animate={{
              x: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MainLayout;