import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';

const { 
  FiMessageCircle, FiSend, FiX, FiUsers, FiGlobe, FiLock, FiMusic, 
  FiDollarSign, FiZap, FiHeart, FiShare2, FiMic, FiVideo, FiSmile, 
  FiPaperclip, FiBrain, FiTrendingUp, FiStar, FiCrown, FiShield, 
  FiEye, FiVolume2, FiPlay, FiSettings 
} = FiIcons;

function RevolutionaryChat({ isMobile = false, isOpen = false, onClose = null }) {
  const { user } = useAuth();
  const toast = useToastContext();
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('global');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sharedTrack, setSharedTrack] = useState(null);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Revolutionary Features State
  const [revenueSharing, setRevenueSharing] = useState(false);
  const [emotionalAI, setEmotionalAI] = useState(true);
  const [holographicMode, setHolographicMode] = useState(false);
  const [quantumEncryption, setQuantumEncryption] = useState(false);

  // Use external state for mobile, internal for desktop
  const chatOpen = isMobile ? isOpen : internalOpen;
  
  const setChatOpen = (open) => {
    if (isMobile) {
      if (!open && onClose) onClose();
    } else {
      setInternalOpen(open);
    }
  };

  const chatTabs = [
    { id: 'global', label: 'Global', icon: FiGlobe, color: 'from-emerald-500 to-emerald-400', badge: 'LIVE' },
    { id: 'creators', label: 'Creators', icon: FiCrown, color: 'from-emerald-600 to-emerald-500', badge: 'VIP' },
    { id: 'private', label: 'Private', icon: FiLock, color: 'from-emerald-400 to-emerald-300', badge: 'SECURE' },
    { id: 'ai', label: 'AI', icon: FiBrain, color: 'from-emerald-500 to-emerald-400', badge: 'LUXURY AI' }
  ];

  const mockMessages = [
    {
      id: 1,
      user: {
        name: 'NeuroWave',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        verified: true,
        isCreator: true
      },
      content: 'Just dropped my new luxury track! 🎵 Anyone want to collaborate?',
      timestamp: '2 min ago',
      type: 'text',
      reactions: { heart: 12, fire: 8, star: 5 },
      sharedTrack: {
        title: 'Emerald Symphony',
        artist: 'NeuroWave',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        revenue: '$45.20'
      },
      emotionalTone: 'excited',
      revenueEarned: 45.20
    },
    {
      id: 2,
      user: {
        name: 'CyberSonic',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        verified: true,
        isCreator: true
      },
      content: 'Love the luxury vibes! Let\'s create something premium together 💎',
      timestamp: '1 min ago',
      type: 'text',
      reactions: { heart: 8, star: 3 },
      emotionalTone: 'enthusiastic'
    },
    {
      id: 3,
      user: {
        name: 'Luxury AI Assistant',
        avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop',
        isAI: true
      },
      content: 'I analyzed the emotional resonance of your track and suggest adding emerald-tone harmonics at 1:23 for maximum luxury impact. Predicted premium revenue boost: +23%',
      timestamp: 'now',
      type: 'ai-suggestion',
      aiAnalysis: {
        emotionalImpact: 94,
        revenueProjection: 234.50,
        suggestions: ['Emerald harmonics', 'Luxury enhancement', 'Premium optimization']
      }
    }
  ];

  useEffect(() => {
    if (chatOpen) {
      setMessages(mockMessages);
      scrollToBottom();
      // Simulate real-time updates
      const interval = setInterval(() => {
        // Add random messages occasionally for demo
        if (Math.random() > 0.95) {
          const newMessage = {
            id: Date.now(),
            user: {
              name: 'LuxuryUser' + Math.floor(Math.random() * 100),
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
              verified: Math.random() > 0.5
            },
            content: ['Amazing luxury track! 💎', 'Love this premium vibe', 'Elite collaboration?', 'This is premium! 🎵'][Math.floor(Math.random() * 4)],
            timestamp: 'now',
            type: 'text',
            emotionalTone: ['excited', 'happy', 'enthusiastic'][Math.floor(Math.random() * 3)]
          };
          setMessages(prev => [...prev, newMessage]);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [chatOpen, activeTab]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !sharedTrack) return;

    const newMessage = {
      id: Date.now(),
      user: {
        name: user?.name || 'User',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        verified: user?.verified || false,
        isCreator: true
      },
      content: message,
      timestamp: 'now',
      type: sharedTrack ? 'track-share' : 'text',
      sharedTrack: sharedTrack,
      emotionalTone: emotionalAI ? analyzeEmotion(message) : null,
      revenueSharing: revenueSharing
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setSharedTrack(null);

    // Revolutionary revenue sharing
    if (revenueSharing && sharedTrack) {
      const revenue = Math.random() * 10 + 5; // $5-15 per share
      toast.success(
        `💰 You earned $${revenue.toFixed(2)} from sharing "${sharedTrack.title}"! Premium revenue-sharing activated.`,
        {
          title: '🚀 Luxury Revenue Share',
          duration: 5000
        }
      );
    }

    // AI response in AI tab
    if (activeTab === 'ai') {
      setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }

    // Show success message
    toast.success('Message sent successfully! 💎', {
      title: '📨 Luxury Message Delivered',
      duration: 2000
    });
  };

  const analyzeEmotion = (text) => {
    const emotions = ['excited', 'happy', 'creative', 'enthusiastic', 'calm', 'energetic'];
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      {
        content: 'Based on your message, I recommend collaborating with premium producers who specialize in your luxury genre. I found 3 perfect elite matches with 97% compatibility!',
        aiAnalysis: {
          emotionalImpact: 89,
          revenueProjection: 156.30,
          suggestions: ['Premium genre matching', 'Elite collaboration tools', 'Luxury revenue optimization']
        }
      },
      {
        content: 'Your creative energy is at premium levels! This is the perfect time to create luxury content. I\'ve prepared some AI-generated emerald chord progressions that match your sophisticated mood.',
        aiAnalysis: {
          emotionalImpact: 95,
          revenueProjection: 203.40,
          suggestions: ['Luxury mood-based creation', 'AI emerald progressions', 'Premium timing']
        }
      }
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now() + 1,
      user: {
        name: 'Luxury AI Assistant',
        avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop',
        isAI: true
      },
      content: response.content,
      timestamp: 'now',
      type: 'ai-suggestion',
      aiAnalysis: response.aiAnalysis
    };
  };

  const handleTrackShare = (track) => {
    setSharedTrack(track);
    toast.info('Premium track ready to share! Type your message and send.', {
      title: '🎵 Luxury Track Sharing',
      duration: 3000
    });
  };

  const handleVoiceRecord = () => {
    setVoiceRecording(!voiceRecording);
    if (!voiceRecording) {
      toast.info('🎤 Premium voice recording started! Luxury audio-to-text with emotional analysis.', {
        title: 'Luxury Voice Message',
        duration: 3000
      });
      // Simulate recording
      setTimeout(() => {
        setVoiceRecording(false);
        toast.success('🎤 Premium voice message recorded! Ready to send.', {
          title: 'Luxury Recording Complete',
          duration: 2000
        });
      }, 3000);
    }
  };

  const getEmotionalColor = (tone) => {
    const colors = {
      excited: 'text-emerald-400',
      happy: 'text-emerald-300',
      creative: 'text-emerald-500',
      enthusiastic: 'text-emerald-200',
      calm: 'text-emerald-600',
      energetic: 'text-emerald-400'
    };
    return colors[tone] || 'text-white';
  };

  const handleFeatureToggle = (feature) => {
    switch (feature) {
      case 'revenue':
        setRevenueSharing(!revenueSharing);
        toast.info(
          `💰 Premium revenue sharing ${!revenueSharing ? 'enabled' : 'disabled'}! ${!revenueSharing ? 'You can now earn from luxury chat interactions.' : 'Revenue sharing turned off.'}`,
          {
            title: '💎 Premium Revenue Sharing',
            duration: 3000
          }
        );
        break;
      case 'emotional':
        setEmotionalAI(!emotionalAI);
        toast.info(
          `🧠 Luxury Emotional AI ${!emotionalAI ? 'enabled' : 'disabled'}! ${!emotionalAI ? 'Messages will be analyzed for premium emotional context.' : 'Emotional analysis turned off.'}`,
          {
            title: '🤖 Luxury Emotional AI',
            duration: 3000
          }
        );
        break;
      case 'quantum':
        setQuantumEncryption(!quantumEncryption);
        toast.info(
          `🔒 Emerald quantum encryption ${!quantumEncryption ? 'enabled' : 'disabled'}! ${!quantumEncryption ? 'Your messages are now emerald-encrypted.' : 'Standard encryption active.'}`,
          {
            title: '⚛️ Emerald Security',
            duration: 3000
          }
        );
        break;
    }
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    toast.info('Luxury Chat closed. Click the chat button to reopen premium communication.', {
      title: '💬 Luxury Chat Closed',
      duration: 2000
    });
  };

  if (!user) return null;

  // Desktop Chat Toggle Button (only show if not mobile and not open)
  if (!isMobile && !chatOpen) {
    return (
      <motion.button
        className="relative w-10 h-10 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 rounded-xl flex items-center justify-center shadow-xl border border-white/20"
        onClick={() => setInternalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ['0 0 8px rgba(16,185,129,0.3)', '0 0 20px rgba(16,185,129,0.5)', '0 0 8px rgba(16,185,129,0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <SafeIcon icon={FiMessageCircle} className="text-white text-lg" />
        
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">3</span>
        </motion.div>
      </motion.button>
    );
  }

  // Revolutionary Chat Interface
  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          className={`fixed ${isMobile 
            ? 'inset-0 z-50' 
            : 'top-20 right-4 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-6rem)] z-40'
          } bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden`}
          style={{
            background: 'linear-gradient(145deg, rgba(31, 41, 31, 0.95) 0%, rgba(17, 24, 17, 0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            backdropFilter: 'blur(40px) saturate(200%)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 12px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)'
          }}
          initial={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Revolutionary Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiZap} className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Luxury Chat</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                      PREMIUM
                    </span>
                    <span className="text-emerald-400">● 2.5M elite users</span>
                  </div>
                </div>
              </div>

              {/* Feature Toggles and Close Button */}
              <div className="flex items-center space-x-1">
                <motion.button
                  className={`p-1.5 rounded-md transition-all text-xs ${
                    revenueSharing ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/10 text-white/60'
                  }`}
                  onClick={() => handleFeatureToggle('revenue')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title="Premium Revenue Sharing"
                >
                  <SafeIcon icon={FiDollarSign} className="text-xs" />
                </motion.button>

                <motion.button
                  className={`p-1.5 rounded-md transition-all text-xs ${
                    emotionalAI ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/10 text-white/60'
                  }`}
                  onClick={() => handleFeatureToggle('emotional')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title="Luxury Emotional AI"
                >
                  <SafeIcon icon={FiBrain} className="text-xs" />
                </motion.button>

                <motion.button
                  className={`p-1.5 rounded-md transition-all text-xs ${
                    quantumEncryption ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/10 text-white/60'
                  }`}
                  onClick={() => handleFeatureToggle('quantum')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title="Emerald Encryption"
                >
                  <SafeIcon icon={FiShield} className="text-xs" />
                </motion.button>

                {/* Close Button - Always Visible */}
                <motion.button
                  className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  onClick={handleCloseChat}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close Luxury Chat"
                >
                  <SafeIcon icon={FiX} className="text-sm" />
                </motion.button>
              </div>
            </div>

            {/* Revolutionary Chat Tabs */}
            <div className="flex space-x-1 bg-black/30 rounded-lg p-1">
              {chatTabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all relative ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-white/20 to-white/10 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    toast.info(`Switched to ${tab.label} luxury chat`, {
                      title: '💬 Premium Chat Mode',
                      duration: 2000
                    });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <SafeIcon icon={tab.icon} className="text-xs" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-0.5 -right-0.5">
                    <span className={`text-[9px] bg-gradient-to-r ${tab.color} text-white px-1 py-0.5 rounded-full font-bold`}>
                      {tab.badge}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-3 space-y-3 scrollbar-custom ${isMobile ? 'h-[calc(100vh-200px)]' : 'h-[420px]'}`}>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.user.name === user?.name ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`max-w-[280px] ${msg.user.name === user?.name ? 'order-2' : 'order-1'}`}>
                  {/* User Info */}
                  <div className={`flex items-center space-x-2 mb-1 text-xs ${
                    msg.user.name === user?.name ? 'justify-end' : 'justify-start'
                  }`}>
                    {msg.user.name !== user?.name && (
                      <img
                        src={msg.user.avatar}
                        alt={msg.user.name}
                        className="w-5 h-5 rounded-full border border-white/20"
                      />
                    )}
                    <div className="flex items-center space-x-1">
                      <span className="text-white text-xs font-medium">{msg.user.name}</span>
                      {msg.user.verified && (
                        <SafeIcon icon={FiStar} className="text-emerald-400 text-xs" />
                      )}
                      {msg.user.isCreator && (
                        <SafeIcon icon={FiCrown} className="text-emerald-300 text-xs" />
                      )}
                      {msg.user.isAI && (
                        <SafeIcon icon={FiBrain} className="text-emerald-400 text-xs" />
                      )}
                    </div>
                    <span className="text-white/40 text-xs">{msg.timestamp}</span>
                  </div>

                  {/* Message Content */}
                  <div className={`rounded-xl p-2.5 relative text-sm ${
                    msg.user.name === user?.name
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white'
                      : msg.user.isAI
                      ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 text-white'
                      : 'bg-white/10 text-white border border-white/10'
                  }`}>
                    {/* Emotional Tone Indicator */}
                    {msg.emotionalTone && emotionalAI && (
                      <div className="absolute -top-1 -right-1">
                        <div className={`w-3 h-3 rounded-full ${getEmotionalColor(msg.emotionalTone)} bg-current opacity-50 animate-pulse`} />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed">{msg.content}</p>

                    {/* Shared Track */}
                    {msg.sharedTrack && (
                      <motion.div
                        className="mt-2 p-2 bg-black/30 rounded-lg border border-white/10"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={msg.sharedTrack.cover}
                            alt={msg.sharedTrack.title}
                            className="w-8 h-8 rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-medium truncate">{msg.sharedTrack.title}</p>
                            <p className="text-white/60 text-xs">{msg.sharedTrack.artist}</p>
                            {msg.sharedTrack.revenue && (
                              <p className="text-emerald-400 text-xs font-bold">Earned: {msg.sharedTrack.revenue}</p>
                            )}
                          </div>
                          <motion.button
                            className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <SafeIcon icon={FiPlay} className="text-white text-xs ml-0.5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* AI Analysis */}
                    {msg.aiAnalysis && (
                      <motion.div
                        className="mt-2 p-2 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-lg border border-emerald-500/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                          <div className="text-center">
                            <div className="text-emerald-400 font-bold">{msg.aiAnalysis.emotionalImpact}%</div>
                            <div className="text-white/60 text-xs">Impact</div>
                          </div>
                          <div className="text-center">
                            <div className="text-emerald-400 font-bold">${msg.aiAnalysis.revenueProjection}</div>
                            <div className="text-white/60 text-xs">Revenue</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {msg.aiAnalysis.suggestions.map((suggestion, i) => (
                            <div key={i} className="flex items-center text-white/80 text-xs">
                              <SafeIcon icon={FiZap} className="mr-1 text-emerald-400" />
                              <span className="truncate">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Revenue Earned Indicator */}
                    {msg.revenueEarned && revenueSharing && (
                      <div className="mt-1 flex items-center space-x-1 text-xs">
                        <SafeIcon icon={FiDollarSign} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">+${msg.revenueEarned}</span>
                        <span className="text-white/60">earned</span>
                      </div>
                    )}

                    {/* Message Reactions */}
                    {msg.reactions && (
                      <div className="flex items-center space-x-1 mt-2">
                        {Object.entries(msg.reactions).map(([emoji, count]) => (
                          <motion.button
                            key={emoji}
                            className="flex items-center space-x-1 bg-black/30 rounded-full px-1.5 py-0.5 text-xs"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-xs">
                              {emoji === 'heart' ? '❤️' : emoji === 'fire' ? '🔥' : '⭐'}
                            </span>
                            <span className="text-white/60">{count}</span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Revolutionary Input Area */}
          <div className="p-3 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
            {/* Shared Track Preview */}
            {sharedTrack && (
              <motion.div
                className="mb-2 p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMusic} className="text-emerald-400" />
                    <span className="text-white">Sharing: {sharedTrack.title}</span>
                    {revenueSharing && (
                      <span className="text-emerald-400 bg-emerald-500/20 px-1 py-0.5 rounded-full">
                        Premium Revenue ON
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={() => setSharedTrack(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiX} className="text-white/60" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Input Field with Revolutionary Features */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === 'ai' 
                      ? 'Ask Luxury AI anything...'
                      : revenueSharing 
                      ? 'Share premium music and earn...'
                      : 'Type your luxury message...'
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 pr-16 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />

                {/* Voice Recording Indicator */}
                {voiceRecording && (
                  <motion.div
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span className="text-red-400 text-xs">Recording...</span>
                  </motion.div>
                )}

                {/* Input Actions */}
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5">
                  <motion.button
                    className={`p-1.5 rounded-md transition-all ${
                      voiceRecording ? 'bg-red-500/30 text-red-400' : 'hover:bg-white/10 text-white/60'
                    }`}
                    onClick={handleVoiceRecord}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    title="Luxury Voice Message"
                  >
                    <SafeIcon icon={FiMic} className="text-xs" />
                  </motion.button>

                  <motion.button
                    className="hover:bg-white/10 text-white/60 p-1.5 rounded-md transition-all"
                    onClick={() => handleTrackShare({
                      title: 'Premium Track',
                      artist: user?.name || 'User',
                      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
                    })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    title="Share Premium Track"
                  >
                    <SafeIcon icon={FiPaperclip} className="text-xs" />
                  </motion.button>
                </div>
              </div>

              {/* Revolutionary Send Button */}
              <motion.button
                className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center text-white relative overflow-hidden disabled:opacity-50"
                onClick={handleSendMessage}
                disabled={!message.trim() && !sharedTrack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiSend} className="text-sm ml-0.5" />
                
                {/* Quantum Effect */}
                {quantumEncryption && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-300/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>
            </div>

            {/* Revolutionary Features Info */}
            <div className="flex items-center justify-between mt-2 text-xs text-white/60">
              <div className="flex items-center space-x-2">
                {revenueSharing && (
                  <span className="text-emerald-400">💰 Premium ON</span>
                )}
                {emotionalAI && (
                  <span className="text-emerald-400">🧠 AI ON</span>
                )}
                {quantumEncryption && (
                  <span className="text-emerald-400">🔒 Emerald ON</span>
                )}
              </div>
              <span>Enter to send</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RevolutionaryChat;