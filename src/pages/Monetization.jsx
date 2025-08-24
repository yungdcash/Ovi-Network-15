import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiUsers, FiMusic, FiVideo, FiGift, FiCreditCard, FiTarget, FiStar, FiZap, FiShield, FiAward, FiGlobe, FiCrown, FiLock, FiBrain, FiHeart } = FiIcons;

function Monetization() {
  const [selectedPlan, setSelectedPlan] = useState('creator');

  const earningsData = [
    { source: 'Streaming Royalties', amount: '$2,847', growth: '+12%', color: 'text-blue-400' },
    { source: 'Live Stream Donations', amount: '$1,523', growth: '+28%', color: 'text-green-400' },
    { source: 'Ad Revenue', amount: '$892', growth: '+15%', color: 'text-purple-400' },
    { source: 'NFT Sales', amount: '$3,240', growth: '+45%', color: 'text-yellow-400' },
    { source: 'Fan Investments', amount: '$5,890', growth: '+67%', color: 'text-pink-400' },
    { source: 'Virtual Concerts', amount: '$4,120', growth: '+89%', color: 'text-cyan-400' },
    { source: 'AI Music Licensing', amount: '$7,320', growth: '+156%', color: 'text-orange-400' },
  ];

  const plans = [
    {
      id: 'creator',
      name: 'Creator',
      price: '$9.99',
      features: [
        'Unlimited uploads',
        'Basic analytics',
        'Community features',
        '5% platform fee',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      features: [
        'Everything in Creator',
        'Advanced analytics',
        'Custom branding',
        '3% platform fee',
        'Priority support',
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      features: [
        'Everything in Pro',
        'White-label solution',
        'API access',
        '1% platform fee',
        'Dedicated manager',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'vip',
      name: 'VIP Creator',
      price: '$199.99',
      features: [
        'Everything in Enterprise',
        'AI Music Rights Trading',
        'Quantum Sound Synthesis',
        'Emotion-Based Revenue Streams',
        '0% platform fee',
        'Personal AI Assistant',
        'Exclusive VIP Monetization',
      ],
      color: 'from-yellow-400 via-pink-500 to-purple-600',
      vip: true,
    },
  ];

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Creator Economy</h1>
          <p className="text-gray-400">Revolutionary monetization platform for music creators</p>
        </div>
        
        <motion.button
          className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeIcon icon={FiCreditCard} className="mr-2" />
          Withdraw Earnings
        </motion.button>
      </div>

      {/* Earnings Overview */}
      <motion.div
        className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Earnings Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earningsData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-300 text-sm">{item.source}</h3>
                <span className={`text-sm ${item.color}`}>{item.growth}</span>
              </div>
              <div className="text-2xl font-bold text-white">{item.amount}</div>
            </motion.div>
          ))}
        </div>

        {/* Total Earnings */}
        <motion.div
          className="mt-6 p-6 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg border border-green-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-300 mb-2">Total Monthly Earnings</h3>
              <div className="text-4xl font-bold text-white">$24,832</div>
              <div className="text-green-400 text-sm flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="mr-1" />
                +67% from last month
              </div>
            </div>
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="text-white text-3xl" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Revolutionary Monetization Methods */}
      <motion.div
        className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Revolutionary Monetization Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              icon: FiMusic,
              title: 'Streaming Royalties',
              description: 'Earn from every play of your tracks',
              rate: '$0.003 per stream',
              color: 'from-blue-500 to-cyan-500',
              isNew: false,
            },
            {
              icon: FiVideo,
              title: 'Live Stream Revenue',
              description: 'Monetize your live performances',
              rate: 'Up to 70% of donations',
              color: 'from-red-500 to-pink-500',
              isNew: false,
            },
            {
              icon: FiTarget,
              title: 'Ad Revenue Sharing',
              description: 'Earn from targeted advertisements',
              rate: '60% revenue share',
              color: 'from-purple-500 to-indigo-500',
              isNew: false,
            },
            {
              icon: FiGift,
              title: 'Fan Support',
              description: 'Direct support from your fans',
              rate: '95% of donations',
              color: 'from-yellow-500 to-orange-500',
              isNew: false,
            },
            {
              icon: FiUsers,
              title: 'Subscription Tiers',
              description: 'Monthly recurring revenue',
              rate: 'Set your own price',
              color: 'from-green-500 to-teal-500',
              isNew: false,
            },
            {
              icon: FiCreditCard,
              title: 'NFT Marketplace',
              description: 'Sell exclusive digital collectibles & limited editions',
              rate: '2.5% platform fee',
              color: 'from-pink-500 to-rose-500',
              isNew: true,
            },
            {
              icon: FiStar,
              title: 'Fan Investment Program',
              description: 'Fans invest in your career for revenue sharing',
              rate: 'Up to $100K funding',
              color: 'from-amber-500 to-yellow-500',
              isNew: true,
            },
            {
              icon: FiZap,
              title: 'AI-Powered Licensing',
              description: 'Automated sync licensing for media & games',
              rate: '80% licensing fee',
              color: 'from-violet-500 to-purple-500',
              isNew: true,
            },
            {
              icon: FiShield,
              title: 'Exclusive Access Passes',
              description: 'VIP content & experiences for premium fans',
              rate: 'Premium pricing tiers',
              color: 'from-emerald-500 to-green-500',
              isNew: true,
            },
            {
              icon: FiAward,
              title: 'Virtual Concert Venues',
              description: 'Host immersive 3D concerts in metaverse',
              rate: 'Ticket sales + merch',
              color: 'from-cyan-500 to-blue-500',
              isNew: true,
            },
            {
              icon: FiGlobe,
              title: 'Global Royalty Splits',
              description: 'Smart contracts for collaborative earnings',
              rate: 'Automated distribution',
              color: 'from-indigo-500 to-blue-500',
              isNew: true,
            },
            {
              icon: FiBrain,
              title: 'AI Music Rights Trading',
              description: 'World-first AI-powered music rights marketplace with predictive valuation',
              rate: 'Up to 500% ROI potential',
              color: 'from-orange-500 via-red-500 to-pink-500',
              isNew: true,
              worldFirst: true,
            },
          ].map((method, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {method.worldFirst && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  WORLD FIRST
                </div>
              )}
              
              {method.isNew && !method.worldFirst && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-2 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              )}
              
              <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                <SafeIcon icon={method.icon} className="text-white text-xl" />
              </div>
              
              <h3 className="text-white font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{method.description}</p>
              <div className="text-neon-blue font-medium text-sm">{method.rate}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Music Rights Trading Feature Spotlight */}
      <motion.div
        className="bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 rounded-xl p-6 border border-orange-500/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <SafeIcon icon={FiBrain} className="mr-3 text-orange-400" />
              AI Music Rights Trading
              <span className="ml-3 text-xs bg-gradient-to-r from-yellow-400 to-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                WORLD FIRST
              </span>
            </h2>
            <p className="text-gray-300">Revolutionary AI-powered marketplace for trading music rights with predictive valuation algorithms</p>
          </div>
          <motion.button
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Trading
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-orange-300 font-semibold mb-2">AI Valuation Engine</h3>
            <div className="text-2xl font-bold text-white mb-1">$2.4M</div>
            <div className="text-sm text-gray-400">Portfolio value predicted</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-orange-300 font-semibold mb-2">Active Trades</h3>
            <div className="text-2xl font-bold text-white mb-1">127</div>
            <div className="text-sm text-gray-400">Rights being traded</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-orange-300 font-semibold mb-2">Avg. ROI</h3>
            <div className="text-2xl font-bold text-white mb-1">347%</div>
            <div className="text-sm text-gray-400">In past 6 months</div>
          </div>
        </div>
      </motion.div>

      {/* Fan Investment Feature Spotlight */}
      <motion.div
        className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-xl p-6 border border-amber-500/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <SafeIcon icon={FiStar} className="mr-3 text-amber-400" />
              Fan Investment Program
            </h2>
            <p className="text-gray-300">Let your fans invest in your success and share in your revenue growth</p>
          </div>
          <motion.button
            className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Campaign
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-amber-300 font-semibold mb-2">Funding Goal</h3>
            <div className="text-2xl font-bold text-white mb-1">$50,000</div>
            <div className="text-sm text-gray-400">Target reached: 68%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full w-2/3"></div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-amber-300 font-semibold mb-2">Active Investors</h3>
            <div className="text-2xl font-bold text-white mb-1">847</div>
            <div className="text-sm text-gray-400">+23% this week</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-amber-300 font-semibold mb-2">Revenue Share</h3>
            <div className="text-2xl font-bold text-white mb-1">15%</div>
            <div className="text-sm text-gray-400">To investors for 2 years</div>
          </div>
        </div>
      </motion.div>

      {/* NFT Marketplace Feature */}
      <motion.div
        className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-xl p-6 border border-pink-500/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <SafeIcon icon={FiCreditCard} className="mr-3 text-pink-400" />
              NFT Marketplace
            </h2>
            <p className="text-gray-300">Create and sell exclusive digital collectibles, album art, and limited editions</p>
          </div>
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create NFT
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Quantum Beat #001', price: '0.5 ETH', status: 'Sold' },
            { name: 'Digital Dreams Cover', price: '0.3 ETH', status: 'Available' },
            { name: 'Exclusive Remix', price: '0.8 ETH', status: 'Auction' },
            { name: 'Concert Ticket NFT', price: '0.2 ETH', status: 'Available' },
          ].map((nft, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <div className="w-full h-32 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg mb-3 flex items-center justify-center">
                <SafeIcon icon={FiMusic} className="text-white text-2xl" />
              </div>
              <h4 className="text-white font-medium text-sm mb-1">{nft.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-pink-400 font-semibold text-sm">{nft.price}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  nft.status === 'Sold' ? 'bg-red-500/20 text-red-300' :
                  nft.status === 'Auction' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {nft.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subscription Plans */}
      <motion.div
        className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Creator Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white/5 rounded-xl p-6 border transition-all cursor-pointer ${
                selectedPlan === plan.id 
                  ? 'border-neon-blue bg-white/10' 
                  : 'border-white/10 hover:border-white/20'
              } ${plan.vip ? 'ring-2 ring-yellow-400/50' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.vip && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center">
                    <SafeIcon icon={FiCrown} className="mr-1" />
                    VIP EXCLUSIVE
                  </span>
                </div>
              )}
              
              <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mb-4 ${plan.vip ? 'animate-pulse' : ''}`}>
                <SafeIcon icon={plan.vip ? FiCrown : FiDollarSign} className="text-white text-xl" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-4">
                {plan.price}
                <span className="text-gray-400 text-sm font-normal">/month</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                    <div className={`w-2 h-2 ${plan.vip ? 'bg-yellow-400' : 'bg-neon-blue'} rounded-full mr-3 ${plan.vip ? 'animate-pulse' : ''}`}></div>
                    {feature}
                    {plan.vip && (featureIndex === 1 || featureIndex === 2 || featureIndex === 3) && (
                      <span className="ml-2 text-xs bg-gradient-to-r from-yellow-400 to-red-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
                        WORLD FIRST
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                selectedPlan === plan.id
                  ? plan.vip 
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white'
                    : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                {selectedPlan === plan.id ? 'Current Plan' : plan.vip ? 'Upgrade to VIP' : 'Select Plan'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* VIP Exclusive Features Showcase */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 rounded-xl p-6 border border-yellow-400/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiCrown} className="text-yellow-400 text-2xl mr-3" />
            <h3 className="text-2xl font-bold text-white">VIP Creator Exclusive Features</h3>
            <span className="ml-3 text-xs bg-gradient-to-r from-yellow-400 to-red-500 text-white px-2 py-1 rounded-full animate-pulse">
              WORLD FIRST TECHNOLOGY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border border-yellow-400/20">
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiBrain} className="text-yellow-400 text-xl mr-3" />
                <h4 className="text-white font-semibold">AI Music Rights Trading</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Revolutionary AI-powered marketplace for trading music rights with predictive valuation algorithms
              </p>
              <div className="text-yellow-400 font-semibold">Up to 500% ROI</div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-orange-400/20">
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiZap} className="text-orange-400 text-xl mr-3" />
                <h4 className="text-white font-semibold">Quantum Sound Synthesis</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Generate unique sounds using quantum computing algorithms that create never-before-heard frequencies
              </p>
              <div className="text-orange-400 font-semibold">Infinite Possibilities</div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-red-400/20">
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiHeart} className="text-red-400 text-xl mr-3" />
                <h4 className="text-white font-semibold">Emotion-Based Revenue</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                AI analyzes listener emotions in real-time and adjusts revenue based on emotional impact of your music
              </p>
              <div className="text-red-400 font-semibold">300% Higher Earnings</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <motion.button
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-3 rounded-lg text-white font-bold text-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={FiLock} className="mr-2" />
              Unlock VIP Features - $199.99/month
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics Preview */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Revenue Trends</h3>
          <div className="h-48 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Revenue chart visualization</p>
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Top Earning Sources</h3>
          <div className="space-y-3">
            {[
              { title: 'AI Music Rights', earnings: '$7,320', percentage: 29 },
              { title: 'Fan Investments', earnings: '$5,890', percentage: 24 },
              { title: 'Virtual Concerts', earnings: '$4,120', percentage: 17 },
              { title: 'NFT Sales', earnings: '$3,240', percentage: 13 },
              { title: 'Streaming', earnings: '$2,847', percentage: 11 },
            ].map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white">{source.title}</span>
                    <span className="text-green-400 font-semibold">{source.earnings}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Monetization;