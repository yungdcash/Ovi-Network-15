import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import TrendingTracks from '../components/home/TrendingTracks';
import CreatorSpotlight from '../components/home/CreatorSpotlight';
import LiveStreams from '../components/home/LiveStreams';
import QuickStats from '../components/home/QuickStats';
import { useAuth } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';

const { 
  FiTrendingUp, FiUsers, FiMic, FiVideo, FiDollarSign, FiMusic, 
  FiZap, FiBrain, FiShield, FiCompass, FiArrowRight, FiStar, 
  FiPlay, FiHeadphones
} = FiIcons;

function Home({ setCurrentTrack, setIsPlaying }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToastContext();

  const handleStartCreating = () => {
    if (!user) {
      toast.warning(
        'Please sign in to access the luxury studio and start creating premium music!',
        {
          title: '🔐 Authentication Required',
          duration: 5000,
          action: {
            label: 'Sign In Now',
            onClick: () => {
              // This will be handled by AuthGuard
              toast.info('Authentication modal will open automatically.', {
                title: '🚪 Opening Sign In',
                duration: 2000
              });
            }
          }
        }
      );
      return;
    }

    // Enhanced navigation with toast feedback
    toast.success(
      '🎵 Welcome to the Luxury Studio! Your premium production tools are loading...',
      {
        title: '🚀 Entering Studio Mode',
        duration: 3000,
        action: {
          label: 'Studio Tips',
          onClick: () => {
            toast.info(
              '💡 Pro Tip: Use the AI Assistant for luxury chord progressions and premium sound suggestions!',
              {
                title: '🎯 Studio Pro Tips',
                duration: 4000
              }
            );
          }
        }
      }
    );

    // Navigate to studio with smooth transition
    setTimeout(() => {
      navigate('/studio');
    }, 500);
  };

  const handleExploreLuxuryMusic = () => {
    // Enhanced navigation with toast feedback
    toast.success(
      '🎧 Entering the luxury music discovery portal! Premium tracks from elite creators await...',
      {
        title: '🌟 Exploring Premium Music',
        duration: 3000,
        action: {
          label: 'Discovery Tips',
          onClick: () => {
            toast.info(
              '💎 Tip: Use advanced filters to find emerald-grade tracks that match your sophisticated taste!',
              {
                title: '🔍 Discovery Pro Tips',
                duration: 4000
              }
            );
          }
        }
      }
    );

    // Navigate to discover with smooth transition
    setTimeout(() => {
      navigate('/discover');
    }, 500);
  };

  const handleFeatureClick = (featureType) => {
    const featureActions = {
      'creator-economy': () => {
        toast.info(
          '💰 Luxury Creator Economy features loading! Premium monetization tools and AI-powered revenue optimization await.',
          {
            title: '💎 Premium Monetization',
            duration: 4000,
            action: {
              label: 'Go to Monetization',
              onClick: () => navigate('/monetization')
            }
          }
        );
      },
      'social-ecosystem': () => {
        toast.info(
          '🌐 Elite Social Ecosystem opening! Connect with luxury creators and premium fans in our exclusive network.',
          {
            title: '👑 Elite Social Network',
            duration: 4000,
            action: {
              label: 'Join Social Hub',
              onClick: () => navigate('/social')
            }
          }
        );
      },
      'luxury-studio': () => {
        if (user) {
          handleStartCreating();
        } else {
          toast.warning(
            'Premium Studio access requires authentication. Sign in to unlock luxury production tools!',
            {
              title: '🔐 Studio Access',
              duration: 4000
            }
          );
        }
      },
      'live-streaming': () => {
        toast.info(
          '📺 Premium Live Streaming platform coming soon! Monetized high-quality streaming for exclusive performances.',
          {
            title: '🎬 Live Streaming',
            duration: 4000,
            action: {
              label: 'View Live Streams',
              onClick: () => {
                // Scroll to live streams section
                const liveStreamsSection = document.querySelector('[data-section="live-streams"]');
                if (liveStreamsSection) {
                  liveStreamsSection.scrollIntoView({ behavior: 'smooth' });
                  toast.success('Scrolled to Live Streams section!', {
                    title: '📍 Navigation',
                    duration: 2000
                  });
                }
              }
            }
          }
        );
      },
      'ai-assistant': () => {
        toast.info(
          '🤖 Luxury AI Assistant is integrated throughout the platform! Experience AI-powered recommendations everywhere.',
          {
            title: '🧠 AI Assistant',
            duration: 4000,
            action: {
              label: 'Try AI Chat',
              onClick: () => {
                toast.success('Open the chat panel to interact with our Luxury AI Assistant!', {
                  title: '💬 AI Chat Available',
                  duration: 3000
                });
              }
            }
          }
        );
      },
      'emerald-security': () => {
        toast.info(
          '🛡️ Emerald Security features are active! Your account is protected with military-grade security options.',
          {
            title: '🔒 Security Features',
            duration: 4000,
            action: {
              label: 'Security Settings',
              onClick: () => {
                toast.info('Access Security Settings from the Luxury Settings panel!', {
                  title: '⚙️ Settings Access',
                  duration: 3000
                });
              }
            }
          }
        );
      }
    };

    const action = featureActions[featureType];
    if (action) action();
  };

  const handleQuickAction = (actionType) => {
    const quickActions = {
      'trending': () => {
        // Scroll to trending section
        const trendingSection = document.querySelector('[data-section="trending"]');
        if (trendingSection) {
          trendingSection.scrollIntoView({ behavior: 'smooth' });
          toast.success('Scrolled to Trending Tracks!', {
            title: '📈 Trending Music',
            duration: 2000
          });
        }
      },
      'creators': () => {
        // Scroll to creator spotlight
        const creatorSection = document.querySelector('[data-section="creators"]');
        if (creatorSection) {
          creatorSection.scrollIntoView({ behavior: 'smooth' });
          toast.success('Scrolled to Creator Spotlight!', {
            title: '⭐ Featured Creators',
            duration: 2000
          });
        }
      },
      'dashboard': () => {
        if (user) {
          navigate('/dashboard');
          toast.success('Opening your luxury dashboard...', {
            title: '📊 Dashboard',
            duration: 2000
          });
        } else {
          toast.warning('Sign in to access your personal dashboard!', {
            title: '🔐 Dashboard Access',
            duration: 3000
          });
        }
      }
    };

    const action = quickActions[actionType];
    if (action) action();
  };

  return (
    <div className="home-container">
      <motion.div
        className="space-y-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.div
          className="relative overflow-hidden card-3d animate-float-3d home-section"
          style={{
            background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(31, 41, 31, 0.9) 50%, rgba(15, 15, 15, 0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)'
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content relative z-10">
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center animate-glow-3d flex-shrink-0">
                <SafeIcon icon={FiMusic} className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gradient-3d leading-tight">
                  Welcome to Ovi Network
                </h1>
                <p className="text-lg text-white/60 mt-2">Luxury Music Platform</p>
              </div>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8 max-w-4xl leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience the world's most luxurious music platform combining premium streaming, 
              elite social networking, professional creator tools, and revolutionary monetization 
              systems - all powered by emerald-grade technology.
            </motion.p>

            <motion.div
              className="button-group"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button 
                className="btn-3d-primary flex items-center space-x-3 relative overflow-hidden group"
                onClick={handleStartCreating}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 16px 40px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiZap} className="text-lg" />
                <span className="font-semibold">Start Creating</span>
                <SafeIcon icon={FiArrowRight} className="text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                
                {/* Enhanced shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>

              <motion.button 
                className="btn-3d-secondary flex items-center space-x-3 relative overflow-hidden group"
                onClick={handleExploreLuxuryMusic}
                whileHover={{ 
                  scale: 1.05,
                  background: 'linear-gradient(145deg, rgba(75, 85, 99, 0.4) 0%, rgba(55, 65, 81, 0.3) 100%)',
                  borderColor: 'rgba(16, 185, 129, 0.25)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiCompass} className="text-lg" />
                <span className="font-semibold">Explore Luxury Music</span>
                <SafeIcon icon={FiHeadphones} className="text-sm opacity-70 group-hover:opacity-100 transition-all" />
                
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                />
              </motion.button>
            </motion.div>

            {/* Quick Action Pills */}
            <motion.div
              className="flex flex-wrap gap-3 mt-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all text-sm"
                onClick={() => handleQuickAction('trending')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiTrendingUp} className="text-emerald-400" />
                <span>View Trending</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all text-sm"
                onClick={() => handleQuickAction('creators')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiStar} className="text-emerald-400" />
                <span>Featured Creators</span>
              </motion.button>

              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-all text-sm"
                onClick={() => handleQuickAction('dashboard')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiPlay} className="text-emerald-400" />
                <span>{user ? 'My Dashboard' : 'Sign In First'}</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-10 right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl hidden lg:block"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-20 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl hidden lg:block"
            animate={{
              y: [10, -10, 10],
              rotate: [360, 180, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        {/* Quick Stats */}
        <div className="home-section">
          <QuickStats />
        </div>

        {/* Platform Features Grid */}
        <motion.div
          className="home-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="feature-grid">
            {[
              {
                icon: FiMusic,
                title: 'Luxury Creator Economy',
                description: 'Premium monetization platform for elite artists and producers with AI-powered luxury insights',
                color: 'from-emerald-500 to-emerald-400',
                stats: '$2.5M+ earned',
                badge: 'PREMIUM',
                actionType: 'creator-economy'
              },
              {
                icon: FiUsers,
                title: 'Elite Social Ecosystem',
                description: 'Exclusive social network designed for luxury music creators and premium fans',
                color: 'from-emerald-600 to-emerald-500',
                stats: '500K+ elite creators',
                badge: 'EXCLUSIVE',
                actionType: 'social-ecosystem'
              },
              {
                icon: FiMic,
                title: 'Professional Luxury Studio',
                description: 'Industry-grade premium production tools accessible directly in your browser',
                color: 'from-emerald-400 to-emerald-300',
                stats: '1M+ luxury tracks created',
                badge: 'PRO',
                actionType: 'luxury-studio'
              },
              {
                icon: FiVideo,
                title: 'Premium Live Streaming',
                description: 'Monetized high-quality luxury video streaming for exclusive performances',
                color: 'from-emerald-500 to-emerald-400',
                stats: '50K+ premium streams',
                badge: 'LIVE',
                actionType: 'live-streaming'
              },
              {
                icon: FiBrain,
                title: 'Luxury AI Assistant',
                description: 'Advanced AI-powered luxury music creation, mixing, and premium mastering assistance',
                color: 'from-emerald-600 to-emerald-500',
                stats: '99.9% luxury accuracy',
                badge: 'AI',
                actionType: 'ai-assistant'
              },
              {
                icon: FiShield,
                title: 'Emerald Security',
                description: 'Military-grade security with biometric and emerald quantum encryption options',
                color: 'from-emerald-400 to-emerald-300',
                stats: 'Unbreakable',
                badge: 'SECURE',
                actionType: 'emerald-security'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card-3d p-6 hover-lift cursor-pointer group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                onClick={() => handleFeatureClick(feature.actionType)}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-2 py-1 rounded-full font-bold animate-pulse-3d">
                    {feature.badge}
                  </span>
                </div>

                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-3d`}>
                  <SafeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed">{feature.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gradient-3d">{feature.stats}</div>
                  <motion.div
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors"
                    whileHover={{ rotate: 45 }}
                  >
                    <SafeIcon icon={FiArrowRight} className="text-white/60 text-sm" />
                  </motion.div>
                </div>

                {/* Enhanced Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Click Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-2xl opacity-0 group-active:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileTap={{ scale: 1.1, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Sections with Data Attributes for Scrolling */}
        <div className="content-grid home-section">
          <div data-section="trending">
            <TrendingTracks setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />
          </div>
          <div data-section="creators">
            <CreatorSpotlight />
          </div>
        </div>

        <div className="home-section" data-section="live-streams">
          <LiveStreams />
        </div>

        {/* Enhanced Call-to-Action Section */}
        <motion.div
          className="card-3d p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="relative z-10">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-3xl flex items-center justify-center mb-6 mx-auto"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
            >
              <SafeIcon icon={FiMusic} className="text-white text-3xl" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Revolution?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're here to create, discover, or connect - Ovi Network provides the luxury tools 
              and emerald-grade technology to elevate your musical journey to new heights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="btn-3d-primary flex items-center space-x-3 px-8 py-4 text-lg"
                onClick={handleStartCreating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiMic} />
                <span>Create Your First Track</span>
                <SafeIcon icon={FiZap} />
              </motion.button>

              <motion.button
                className="btn-3d-secondary flex items-center space-x-3 px-8 py-4 text-lg"
                onClick={handleExploreLuxuryMusic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiCompass} />
                <span>Discover Premium Music</span>
                <SafeIcon icon={FiMusic} />
              </motion.button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: FiZap, text: 'Instant Creation Tools', color: 'text-emerald-400' },
                { icon: FiStar, text: 'Elite Creator Network', color: 'text-emerald-300' },
                { icon: FiDollarSign, text: 'Premium Monetization', color: 'text-emerald-200' }
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-2 p-3 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <SafeIcon icon={highlight.icon} className={`${highlight.color} text-lg`} />
                  <span className="text-white/80 text-sm font-medium">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-emerald-500/5 to-emerald-400/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;