import React from 'react';
import { motion } from 'framer-motion';
import CreatorDashboard from '../components/dashboard/CreatorDashboard';
import PersonalizedFeed from '../components/recommendations/PersonalizedFeed';
import { useAuth } from '../contexts/AuthContext';

function Dashboard({ setCurrentTrack, setIsPlaying }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/60">Please sign in to view your dashboard</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Your creative command center</p>
      </div>

      {/* Creator Dashboard */}
      <CreatorDashboard />

      {/* Personalized Recommendations */}
      <PersonalizedFeed 
        setCurrentTrack={setCurrentTrack} 
        setIsPlaying={setIsPlaying} 
      />
    </motion.div>
  );
}

export default Dashboard;