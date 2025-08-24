import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckCircle, FiStar, FiShield, FiZap, FiMusic, FiArrowRight, FiCrown, FiAward, FiTrendingUp, FiHeart, FiUsers, FiDollarSign } = FiIcons;

function VerificationSuccessFlow({ verificationData, onContinue }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  const celebrationSteps = [
    {
      icon: FiCheckCircle,
      title: 'Email Verified!',
      subtitle: 'Your account is now active',
      color: 'from-green-400 to-emerald-500',
      duration: 2000
    },
    {
      icon: FiShield,
      title: 'Account Secured',
      subtitle: 'Your profile is protected',
      color: 'from-blue-400 to-cyan-500',
      duration: 1500
    },
    {
      icon: FiMusic,
      title: 'Welcome to Ovi Network',
      subtitle: 'Your musical journey begins now',
      color: 'from-purple-400 to-pink-500',
      duration: 2000
    }
  ];

  const features = [
    {
      icon: FiMusic,
      title: 'Create & Upload',
      description: 'Upload unlimited tracks and create professional music',
      color: 'text-blue-400'
    },
    {
      icon: FiUsers,
      title: 'Connect & Collaborate',
      description: 'Network with artists and producers worldwide',
      color: 'text-purple-400'
    },
    {
      icon: FiDollarSign,
      title: 'Monetize Your Music',
      description: 'Earn from streams, NFTs, and fan investments',
      color: 'text-green-400'
    },
    {
      icon: FiTrendingUp,
      title: 'Grow Your Audience',
      description: 'Advanced analytics and promotion tools',
      color: 'text-orange-400'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setTimeout(() => {
      if (currentStep < celebrationSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, celebrationSteps[currentStep]?.duration || 2000);

    return () => clearTimeout(stepTimer);
  }, [currentStep]);

  return (
    <motion.div
      className="min-h-full flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                rotate: [0, 360],
                opacity: [1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Main Success Animation */}
      <motion.div
        className="space-y-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Animated Success Icon */}
        <motion.div
          className="relative mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          <motion.div
            className={`w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-r ${celebrationSteps[currentStep]?.color || 'from-green-400 to-emerald-500'}`}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity }
            }}
          >
            <SafeIcon 
              icon={celebrationSteps[currentStep]?.icon || FiCheckCircle} 
              className="text-white text-5xl" 
            />
          </motion.div>
          
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/30"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>

        {/* Success Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {celebrationSteps[currentStep]?.title || 'Verification Complete!'}
            </h1>
            <p className="text-xl text-white/70">
              {celebrationSteps[currentStep]?.subtitle || 'Welcome to Ovi Network'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Verification Details */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
            <SafeIcon icon={FiAward} className="mr-2 text-yellow-400" />
            Verification Complete
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Email</span>
              <span className="text-green-400 flex items-center">
                <SafeIcon icon={FiCheckCircle} className="mr-1" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Account Status</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Security Level</span>
              <span className="text-blue-400">Standard</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Verified</span>
              <span className="text-white/90">
                {new Date(verificationData?.timestamp || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* What's Next Section */}
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">What You Can Do Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <SafeIcon icon={feature.icon} className={`${feature.color} text-xl`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <motion.button
          onClick={onContinue}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl flex items-center justify-center space-x-3 text-lg"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(124,58,237,0.4)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start Your Journey</span>
          <SafeIcon icon={FiArrowRight} className="text-xl" />
        </motion.button>
        
        <motion.button
          onClick={() => window.location.hash = '/dashboard'}
          className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl flex items-center justify-center space-x-3 text-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <SafeIcon icon={FiTrendingUp} />
          <span>Go to Dashboard</span>
        </motion.button>
      </motion.div>

      {/* Pro Tip */}
      <motion.div
        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiCrown} className="text-yellow-400 text-xl flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-yellow-300 font-semibold mb-2">Pro Tip</h4>
            <p className="text-yellow-100/80 text-sm leading-relaxed">
              Complete your profile and upload your first track to get discovered by our community of 2.5M+ music lovers and industry professionals!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VerificationSuccessFlow;