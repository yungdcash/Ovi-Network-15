import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';
import BiometricAuth from './BiometricAuth';
import QuantumSecurity from './QuantumSecurity';
import SecurityLevelSelector from './SecurityLevelSelector';
import ForgotPasswordFlow from './ForgotPasswordFlow';
import VerificationSuccessFlow from './VerificationSuccessFlow';

const {
  FiEye, FiEyeOff, FiShield, FiZap, FiLock, FiScan, FiCpu, FiWifi, FiMusic,
  FiCheck, FiArrowRight, FiUser, FiMail, FiX, FiAlertCircle, FiCheckCircle,
  FiStar, FiCrown
} = FiIcons;

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, register, loading } = useAuth();
  const toast = useToastContext();
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState('credentials');
  const [authMethod, setAuthMethod] = useState('standard');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);
  const [fieldTouched, setFieldTouched] = useState({});
  const [verificationSuccess, setVerificationSuccess] = useState(null);
  const [formProgress, setFormProgress] = useState(0);

  // Check for verification success in URL with enhanced detection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get('verified');
    const type = urlParams.get('type');
    const token = urlParams.get('token');
    const success = urlParams.get('success');

    if (verified === 'true' || success === 'true') {
      const verificationData = {
        type: type || 'email',
        verified: true,
        timestamp: new Date().toISOString(),
        token: token ? 'present' : 'none'
      };

      setVerificationSuccess(verificationData);
      setStep('verification-success');

      // Enhanced success notification with celebration
      toast.success(
        '🎉 Your account has been successfully verified! Welcome to Ovi Network - your musical journey begins now!',
        {
          title: '✨ Verification Complete!',
          duration: 10000,
          action: {
            label: 'Start Your Journey',
            onClick: () => {
              setMode('login');
              setStep('credentials');
              setVerificationSuccess(null);
            }
          }
        }
      );

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }
  }, [toast]);

  // Calculate form progress
  useEffect(() => {
    if (mode === 'register') {
      const fields = ['name', 'email', 'password', 'confirmPassword'];
      const completed = fields.filter(field => {
        if (field === 'confirmPassword') {
          return formData[field] && formData.password === formData.confirmPassword;
        }
        return formData[field] && formData[field].trim().length > 0;
      }).length;
      setFormProgress((completed / fields.length) * 100);
    } else {
      const fields = ['email', 'password'];
      const completed = fields.filter(field => 
        formData[field] && formData[field].trim().length > 0
      ).length;
      setFormProgress((completed / fields.length) * 100);
    }
  }, [formData, mode]);

  // Reset everything when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetForm();
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Reset form when mode changes
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [mode]);

  const resetForm = () => {
    setErrors({});
    setAuthStatus(null);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setStep('credentials');
    setAuthMethod('standard');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsSubmitting(false);
    setFieldTouched({});
    setVerificationSuccess(null);
    setFormProgress(0);
  };

  const validateForm = () => {
    const newErrors = {};

    // Enhanced email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required to continue';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
      }
    }

    // Enhanced password validation
    if (!formData.password) {
      newErrors.password = 'Password is required to secure your account';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters for security';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Password is too long (maximum 100 characters)';
    }

    // Registration specific validation with detailed messages
    if (mode === 'register') {
      if (!formData.name.trim()) {
        newErrors.name = 'Your full name is required for your profile';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      } else if (formData.name.trim().length > 50) {
        newErrors.name = 'Name is too long (maximum 50 characters)';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password to ensure accuracy';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match - please try again';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Clear previous state
    setErrors({});
    setAuthStatus(null);

    // Validate form with enhanced feedback
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Enhanced validation error notification
      const errorCount = Object.keys(formErrors).length;
      toast.error(
        `Please fix ${errorCount} form error${errorCount > 1 ? 's' : ''} before continuing`,
        {
          title: '⚠️ Form Validation Required',
          duration: 5000,
          action: {
            label: 'Review Errors',
            onClick: () => {
              // Focus on first error field
              const firstErrorField = Object.keys(formErrors)[0];
              const element = document.querySelector(`input[name="${firstErrorField}"]`);
              if (element) element.focus();
            }
          }
        }
      );
      return;
    }

    setIsSubmitting(true);

    // Enhanced loading notification with progress
    const loadingToastId = toast.loading(
      mode === 'register' 
        ? '🎵 Creating your Ovi Network account and setting up your creative profile...'
        : '🔐 Authenticating your credentials and preparing your dashboard...',
      {
        title: mode === 'register' ? '✨ Creating Your Account' : '🚀 Signing You In',
        persistent: true
      }
    );

    try {
      let result;
      if (mode === 'register') {
        console.log('Attempting registration...');
        result = await register({
          email: formData.email.trim(),
          password: formData.password,
          name: formData.name.trim()
        }, authMethod);
      } else {
        console.log('Attempting login...');
        result = await login({
          email: formData.email.trim(),
          password: formData.password
        }, authMethod);
      }

      console.log('Auth result:', result);

      // Remove loading toast
      toast.removeToast(loadingToastId);

      if (result && result.success) {
        setAuthStatus('success');

        if (mode === 'register') {
          // Enhanced registration success flow
          if (result.message && result.message.includes('email')) {
            // Email verification required
            setStep('email-verification-pending');
            toast.info(
              '📧 We\'ve sent a verification link to your email address. Please check your inbox and click the link to activate your account and unlock all features!',
              {
                title: '🎯 Email Verification Required',
                duration: 15000,
                action: {
                  label: 'Resend Email',
                  onClick: () => toast.info('Resend feature will be available soon! Please check your spam folder.')
                }
              }
            );
          } else {
            // Account created and ready
            toast.success(
              `🎉 Welcome to Ovi Network, ${formData.name.split(' ')[0]}! Your creative account is ready. Start exploring amazing music and connect with artists worldwide! 🌟`,
              {
                title: '🚀 Account Created Successfully!',
                duration: 8000,
                action: {
                  label: 'Explore Platform',
                  onClick: () => {
                    onClose();
                    resetForm();
                  }
                }
              }
            );
          }
        } else {
          // Enhanced login success
          toast.success(
            `🎵 Welcome back to Ovi Network! Your dashboard is loaded and ready. Discover new music, connect with creators, and continue your musical journey! ✨`,
            {
              title: '🌟 Welcome Back!',
              duration: 6000,
              action: {
                label: 'Go to Dashboard',
                onClick: () => {
                  onClose();
                  resetForm();
                  window.location.hash = '/dashboard';
                }
              }
            }
          );
        }

        // Show success animation briefly before closing
        setTimeout(() => {
          if (!result.message?.includes('email')) {
            onClose();
            resetForm();
          }
        }, mode === 'register' ? 3000 : 2000);

      } else {
        // Enhanced error handling with specific messages
        setAuthStatus('error');
        const errorMessage = result?.error || 'Authentication failed. Please try again.';

        if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('invalid_credentials')) {
          const message = '🔒 Invalid email or password. Please double-check your credentials and try again.';
          setErrors({ general: message });
          toast.error(message, {
            title: '❌ Login Failed',
            duration: 8000,
            action: {
              label: 'Forgot Password?',
              onClick: handleForgotPassword
            }
          });
        } else if (errorMessage.includes('Email not confirmed') || errorMessage.includes('email_not_confirmed')) {
          const message = '📧 Please check your email and click the confirmation link before signing in.';
          setErrors({ general: message });
          toast.warning(message, {
            title: '⚠️ Email Confirmation Required',
            duration: 10000,
            action: {
              label: 'Resend Email',
              onClick: () => toast.info('Email resend feature coming soon!')
            }
          });
        } else if (errorMessage.includes('User already registered') || errorMessage.includes('user_already_exists')) {
          const message = '👤 An account with this email already exists. Please try signing in instead.';
          setErrors({ email: message });
          toast.warning(message, {
            title: '🔄 Account Already Exists',
            duration: 8000,
            action: {
              label: 'Switch to Sign In',
              onClick: () => setMode('login')
            }
          });
        } else if (errorMessage.includes('Password should be at least 6 characters') || errorMessage.includes('password_too_short')) {
          const message = '🔑 Password must be at least 6 characters long for security.';
          setErrors({ password: message });
          toast.error(message, {
            title: '🛡️ Password Too Short',
            duration: 5000
          });
        } else if (errorMessage.includes('signup_disabled')) {
          const message = '🚫 Account registration is temporarily disabled. Please try again later.';
          setErrors({ general: message });
          toast.error(message, {
            title: '⏸️ Registration Temporarily Disabled',
            duration: 8000
          });
        } else {
          // Generic enhanced error
          setErrors({ general: errorMessage });
          toast.error(`❌ ${errorMessage}`, {
            title: '🚨 Authentication Error',
            duration: 8000,
            action: {
              label: 'Try Again',
              onClick: () => handleSubmit(e)
            }
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuthStatus('error');

      let message = '🌐 Network error. Please check your connection and try again.';
      let title = '📡 Connection Error';

      if (error.message) {
        if (error.message.includes('fetch')) {
          message = '🔌 Unable to connect to our servers. Please check your internet connection.';
        } else if (error.message.includes('timeout')) {
          message = '⏱️ Request timed out. Please try again.';
          title = '⏰ Timeout Error';
        } else {
          message = `⚠️ ${error.message}`;
          title = '🚨 Authentication Error';
        }
      }

      setErrors({ general: message });

      // Remove loading toast and show error
      toast.removeToast(loadingToastId);
      toast.error(message, {
        title: title,
        duration: 8000,
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(e)
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Mark field as touched
    setFieldTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Clear general error when user makes changes
    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.general;
        return newErrors;
      });
    }

    // Clear auth status when user makes changes
    if (authStatus) {
      setAuthStatus(null);
    }

    // Enhanced field-specific guidance toasts (only show once per field)
    if (!fieldTouched[field] && value.length > 0) {
      if (field === 'email') {
        toast.info('💡 Enter your email address to continue with authentication', {
          title: '📧 Email Address',
          duration: 3000
        });
      } else if (field === 'password') {
        toast.info('🔐 Password must be at least 6 characters long for security', {
          title: '🛡️ Password Requirements',
          duration: 4000
        });
      } else if (field === 'name' && mode === 'register') {
        toast.info('👤 Enter your full name for your creative profile', {
          title: '✨ Profile Name',
          duration: 3000
        });
      } else if (field === 'confirmPassword' && mode === 'register') {
        toast.info('🔒 Re-enter your password to confirm it matches', {
          title: '✅ Confirm Password',
          duration: 3000
        });
      }
    }
  };

  const handleModeSwitch = (newMode) => {
    if (isSubmitting) return;
    setMode(newMode);

    // Enhanced mode switch notification
    toast.info(
      newMode === 'login' 
        ? '🔐 Ready to sign in to your Ovi Network account'
        : '✨ Let\'s create your new creative account on Ovi Network',
      {
        title: newMode === 'login' ? '🚪 Sign In Mode' : '🎯 Create Account Mode',
        duration: 2500
      }
    );
  };

  const handleSecurityLevelChange = (levelId) => {
    setAuthMethod(levelId);

    // Enhanced security level notification
    const securityNames = {
      'standard': 'Standard Security',
      'biometric': 'Biometric Quantum',
      'neural': 'Neural Pattern Auth',
      'quantum': 'Quantum Entanglement'
    };

    toast.info(`🛡️ Security level upgraded to ${securityNames[levelId]}`, {
      title: '🔒 Security Enhanced',
      duration: 4000
    });
  };

  const handleContinueWithSecurity = () => {
    if (authMethod === 'biometric') {
      setStep('biometric');
      toast.info('🔍 Prepare your biometric sensors for advanced authentication', {
        title: '🤖 Biometric Setup',
        duration: 4000
      });
    } else if (authMethod === 'quantum') {
      setStep('quantum');
      toast.info('⚛️ Initializing quantum encryption protocols', {
        title: '🌌 Quantum Security',
        duration: 4000
      });
    } else {
      setStep('credentials');
    }
  };

  const handleForgotPassword = () => {
    resetForm();
    setStep('forgot-password');
    toast.info('🔑 Let\'s help you recover access to your account', {
      title: '🆘 Password Recovery',
      duration: 4000
    });
  };

  const handleForgotPasswordComplete = () => {
    resetForm();
    setStep('credentials');
    setMode('login');
    toast.success('📧 Password reset instructions have been sent to your email!', {
      title: '✅ Recovery Email Sent',
      duration: 6000
    });
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    onClose();
    // Reset form after a brief delay to allow for smooth closing animation
    setTimeout(resetForm, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Enhanced Backdrop with Luxury Theme */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(17, 24, 17, 0.97) 0%, rgba(31, 41, 31, 0.99) 100%)
            `
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        />

        {/* Mobile-Optimized Modal Container with Luxury Theme */}
        <motion.div
          className="relative w-full h-full sm:h-[95vh] sm:max-w-7xl sm:max-h-[95vh] overflow-hidden"
          style={{
            background: `
              linear-gradient(145deg, rgba(31, 41, 31, 0.98) 0%, rgba(17, 24, 17, 0.99) 100%)
            `,
            backdropFilter: 'blur(50px) saturate(200%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: window.innerWidth < 640 ? '0px' : '28px',
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.9),
              0 0 0 1px rgba(16, 185, 129, 0.1),
              inset 0 1px 0 rgba(156, 163, 175, 0.08),
              inset 0 -1px 0 rgba(17, 24, 17, 0.6)
            `
          }}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Enhanced Close Button - Mobile Optimized */}
          <motion.button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 bg-white/8 hover:bg-white/15 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/10"
            onClick={handleCloseModal}
            disabled={isSubmitting}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <SafeIcon icon={FiX} className="text-lg" />
          </motion.button>

          {/* Form Progress Indicator with Emerald Theme */}
          {step === 'credentials' && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          {/* Mobile-First Layout */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Panel - Hidden on Mobile, Visible on Desktop */}
            <motion.div
              className="hidden lg:flex lg:w-[45%] flex-col justify-center p-8 xl:p-12 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(17, 24, 17, 0.99) 0%, rgba(31, 41, 31, 0.97) 100%)
                `,
                borderRight: '1px solid rgba(16, 185, 129, 0.2)'
              }}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {/* Enhanced Ambient Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/4 -left-32 w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 -right-32 w-48 h-48 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                  }}
                  animate={{
                    scale: [1.3, 1, 1.3],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              {/* Enhanced Brand Content */}
              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-3xl flex items-center justify-center mr-4 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity }
                    }}
                  >
                    <SafeIcon icon={FiMusic} className="text-white text-xl" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-300/20 blur-2xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Ovi Network</h1>
                    <p className="text-white/60 text-sm font-medium">Luxury Music Platform</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                    Experience Premium Music Creation
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Join the world's most luxurious music platform with emerald-grade security, 
                    AI-powered tools, and professional monetization systems designed for elite creators.
                  </p>
                </motion.div>

                {/* Enhanced Feature Highlights with Emerald Theme */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  {[
                    { icon: FiShield, text: 'Emerald-Grade Security', color: 'text-emerald-400', badge: 'LUXURY' },
                    { icon: FiZap, text: 'Quantum Authentication', color: 'text-emerald-300', badge: 'PREMIUM' },
                    { icon: FiCpu, text: 'AI-Powered Creation Tools', color: 'text-emerald-200', badge: 'ELITE' },
                    { icon: FiCrown, text: 'Professional Monetization', color: 'text-emerald-100', badge: 'VIP' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center group cursor-pointer"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                    >
                      <div
                        className="w-8 h-8 rounded-2xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                        style={{
                          background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        <SafeIcon icon={feature.icon} className={`${feature.color} text-sm`} />
                      </div>
                      <div className="flex-1">
                        <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                        <div className="flex items-center mt-0.5">
                          <span className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-2 py-0.5 rounded-full font-bold">
                            {feature.badge}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Panel - Mobile-First Authentication Form */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Enhanced Header - Mobile Optimized */}
              <motion.div
                className="px-4 py-4 sm:px-6 sm:py-6 border-b border-white/10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {step === 'credentials' ? (mode === 'login' ? 'Welcome Back' : 'Create Account') :
                       step === 'security' ? 'Choose Security Level' :
                       step === 'verification-success' ? 'Verification Complete' :
                       step === 'email-verification-pending' ? 'Check Your Email' :
                       step === 'forgot-password' ? 'Reset Password' : 'Advanced Security'}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {step === 'credentials' ? (mode === 'login' ? 'Sign in to your luxury account' : 'Join the premium music revolution') :
                       step === 'security' ? 'Select your preferred authentication method' :
                       step === 'verification-success' ? 'Your account has been successfully verified' :
                       step === 'email-verification-pending' ? 'We\'ve sent a verification link to your email' :
                       step === 'forgot-password' ? 'Recover your account access' : 'Complete security setup'}
                    </p>
                  </div>

                  {step === 'credentials' && (
                    <div className="flex justify-center sm:block lg:hidden">
                      <motion.div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      >
                        <SafeIcon icon={FiMusic} className="text-white text-lg" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Enhanced Mode Toggle for Credentials Step - Mobile Optimized */}
                {step === 'credentials' && (
                  <div
                    className="flex rounded-2xl p-1"
                    style={{
                      background: 'linear-gradient(145deg, rgba(17, 24, 17, 0.9) 0%, rgba(31, 41, 31, 0.7) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    <motion.button
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all text-sm relative overflow-hidden ${
                        mode === 'login' ? 'text-white shadow-xl' : 'text-white/60 hover:text-white'
                      }`}
                      style={mode === 'login' ? {
                        background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 1) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
                      } : {}}
                      onClick={() => handleModeSwitch('login')}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                      {mode === 'login' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </motion.button>

                    <motion.button
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all text-sm relative overflow-hidden ${
                        mode === 'register' ? 'text-white shadow-xl' : 'text-white/60 hover:text-white'
                      }`}
                      style={mode === 'register' ? {
                        background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 1) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
                      } : {}}
                      onClick={() => handleModeSwitch('register')}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                      {mode === 'register' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* Enhanced Content Area with Mobile-First Scrolling */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 scrollbar-custom">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step === 'verification-success' && verificationSuccess && (
                      <VerificationSuccessFlow
                        verificationData={verificationSuccess}
                        onContinue={() => {
                          setMode('login');
                          setStep('credentials');
                          setVerificationSuccess(null);
                        }}
                      />
                    )}

                    {step === 'email-verification-pending' && (
                      <motion.div
                        className="text-center space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{
                            scale: { duration: 2, repeat: Infinity },
                            rotate: { duration: 4, repeat: Infinity }
                          }}
                        >
                          <SafeIcon icon={FiMail} className="text-white text-2xl sm:text-3xl" />
                        </motion.div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Check Your Email</h3>
                          <p className="text-white/70 text-sm sm:text-base mb-5 max-w-md mx-auto leading-relaxed">
                            We've sent a verification link to <strong className="text-white">{formData.email}</strong>. 
                            Please check your inbox and click the link to activate your luxury account.
                          </p>

                          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 max-w-md mx-auto">
                            <h4 className="text-emerald-300 font-semibold mb-2">What happens next?</h4>
                            <div className="space-y-2 text-sm text-emerald-200">
                              <p>✓ Click the verification link in your email</p>
                              <p>✓ Your account will be instantly activated</p>
                              <p>✓ Sign in and start creating luxury music</p>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          className="btn-3d-secondary w-full sm:w-auto"
                          onClick={() => setStep('credentials')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Back to Sign In
                        </motion.button>
                      </motion.div>
                    )}

                    {step === 'credentials' && (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                        {/* Enhanced Success/Error Status */}
                        {authStatus === 'success' && (
                          <motion.div
                            className="p-4 sm:p-5 rounded-2xl border"
                            style={{
                              background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
                              border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="flex items-center space-x-3">
                              <SafeIcon icon={FiCheckCircle} className="text-emerald-400 text-xl" />
                              <p className="text-emerald-300 font-medium text-sm sm:text-base">
                                {mode === 'register' ? '🎉 Account created successfully!' : '🚀 Welcome back to Ovi Network!'}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {authStatus === 'error' && errors.general && (
                          <motion.div
                            className="p-4 sm:p-5 rounded-2xl border"
                            style={{
                              background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.08) 100%)',
                              border: '1px solid rgba(239, 68, 68, 0.3)'
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="flex items-center space-x-3">
                              <SafeIcon icon={FiAlertCircle} className="text-red-400 text-xl" />
                              <p className="text-red-300 text-sm sm:text-base">{errors.general}</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Enhanced Name Field for Registration */}
                        {mode === 'register' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <label className="block text-white/90 mb-2 text-sm font-medium">
                              <SafeIcon icon={FiUser} className="inline mr-2 text-emerald-400" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className={`w-full py-3 px-4 text-white placeholder-white/40 border rounded-2xl transition-all focus:outline-none text-sm ${
                                errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 focus:border-emerald-500/50'
                              }`}
                              style={{
                                background: errors.name 
                                  ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                                  : 'linear-gradient(145deg, rgba(17, 24, 17, 0.9) 0%, rgba(31, 41, 31, 0.7) 100%)',
                                boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.4)'
                              }}
                              placeholder="Enter your full name"
                              disabled={isSubmitting}
                              autoComplete="name"
                            />
                            {errors.name && (
                              <motion.p
                                className="text-red-400 text-xs mt-2 flex items-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <SafeIcon icon={FiAlertCircle} className="mr-2" />
                                {errors.name}
                              </motion.p>
                            )}
                          </motion.div>
                        )}

                        {/* Enhanced Email Field */}
                        <div>
                          <label className="block text-white/90 mb-2 text-sm font-medium">
                            <SafeIcon icon={FiMail} className="inline mr-2 text-emerald-400" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full py-3 px-4 text-white placeholder-white/40 border rounded-2xl transition-all focus:outline-none text-sm ${
                              errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 focus:border-emerald-500/50'
                            }`}
                            style={{
                              background: errors.email 
                                ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                                : 'linear-gradient(145deg, rgba(17, 24, 17, 0.9) 0%, rgba(31, 41, 31, 0.7) 100%)',
                              boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.4)'
                            }}
                            placeholder="Enter your email address"
                            disabled={isSubmitting}
                            autoComplete="email"
                          />
                          {errors.email && (
                            <motion.p
                              className="text-red-400 text-xs mt-2 flex items-center"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <SafeIcon icon={FiAlertCircle} className="mr-2" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        {/* Enhanced Password Field */}
                        <div>
                          <label className="block text-white/90 mb-2 text-sm font-medium">
                            <SafeIcon icon={FiLock} className="inline mr-2 text-emerald-400" />
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`w-full py-3 px-4 pr-12 text-white placeholder-white/40 border rounded-2xl transition-all focus:outline-none text-sm ${
                                errors.password ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 focus:border-emerald-500/50'
                              }`}
                              style={{
                                background: errors.password 
                                  ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                                  : 'linear-gradient(145deg, rgba(17, 24, 17, 0.9) 0%, rgba(31, 41, 31, 0.7) 100%)',
                                boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.4)'
                              }}
                              placeholder="Enter your password"
                              disabled={isSubmitting}
                              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={isSubmitting}
                              tabIndex={-1}
                            >
                              <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="text-base" />
                            </motion.button>
                          </div>
                          {errors.password && (
                            <motion.p
                              className="text-red-400 text-xs mt-2 flex items-center"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <SafeIcon icon={FiAlertCircle} className="mr-2" />
                              {errors.password}
                            </motion.p>
                          )}
                        </div>

                        {/* Enhanced Confirm Password for Registration */}
                        {mode === 'register' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <label className="block text-white/90 mb-2 text-sm font-medium">
                              <SafeIcon icon={FiLock} className="inline mr-2 text-emerald-400" />
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={`w-full py-3 px-4 pr-12 text-white placeholder-white/40 border rounded-2xl transition-all focus:outline-none text-sm ${
                                  errors.confirmPassword ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 focus:border-emerald-500/50'
                                }`}
                                style={{
                                  background: errors.confirmPassword 
                                    ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                                    : 'linear-gradient(145deg, rgba(17, 24, 17, 0.9) 0%, rgba(31, 41, 31, 0.7) 100%)',
                                  boxShadow: 'inset 0 2px 12px rgba(0, 0, 0, 0.4)'
                                }}
                                placeholder="Confirm your password"
                                disabled={isSubmitting}
                                autoComplete="new-password"
                              />
                              <motion.button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={isSubmitting}
                                tabIndex={-1}
                              >
                                <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="text-base" />
                              </motion.button>
                            </div>
                            {errors.confirmPassword && (
                              <motion.p
                                className="text-red-400 text-xs mt-2 flex items-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <SafeIcon icon={FiAlertCircle} className="mr-2" />
                                {errors.confirmPassword}
                              </motion.p>
                            )}
                          </motion.div>
                        )}

                        {/* Enhanced Submit Button - Mobile Optimized */}
                        <motion.button
                          type="submit"
                          disabled={loading || isSubmitting || authStatus === 'success'}
                          className="w-full py-4 px-6 rounded-2xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 1) 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            boxShadow: '0 12px 32px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                          whileHover={!isSubmitting && !loading && authStatus !== 'success' ? {
                            scale: 1.02,
                            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                          } : {}}
                          whileTap={!isSubmitting && !loading && authStatus !== 'success' ? {
                            scale: 0.98
                          } : {}}
                        >
                          {loading || isSubmitting ? (
                            <div className="flex items-center justify-center space-x-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>
                                {mode === 'register' ? 'Creating Your Account...' : 'Signing You In...'}
                              </span>
                            </div>
                          ) : authStatus === 'success' ? (
                            <div className="flex items-center justify-center space-x-3">
                              <SafeIcon icon={FiCheckCircle} className="text-lg" />
                              <span>Success!</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-3">
                              <span>{mode === 'login' ? 'Sign In to Ovi Network' : 'Create Your Account'}</span>
                              <SafeIcon icon={FiArrowRight} className="text-lg" />
                            </div>
                          )}

                          {!isSubmitting && !loading && authStatus !== 'success' && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                        </motion.button>

                        {/* Enhanced Footer Actions - Mobile Optimized */}
                        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-4">
                          <motion.button
                            type="button"
                            onClick={() => setStep('security')}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
                            whileHover={{ scale: 1.05, x: 5 }}
                            disabled={isSubmitting}
                          >
                            <SafeIcon icon={FiShield} />
                            <span>Advanced Security</span>
                            <SafeIcon icon={FiArrowRight} />
                          </motion.button>

                          {mode === 'login' && (
                            <motion.button
                              type="button"
                              onClick={handleForgotPassword}
                              className="text-white/60 hover:text-white transition-colors font-medium flex items-center justify-center space-x-2 text-sm"
                              whileHover={{ scale: 1.05, x: -5 }}
                              disabled={isSubmitting}
                            >
                              <SafeIcon icon={FiLock} />
                              <span>Forgot Password?</span>
                            </motion.button>
                          )}
                        </div>
                      </form>
                    )}

                    {step === 'security' && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                      >
                        <button
                          onClick={handleBackToCredentials}
                          className="flex items-center text-white/60 hover:text-white mb-6 transition-colors"
                        >
                          ← Back to Credentials
                        </button>
                        <SecurityLevelSelector
                          selectedLevel={authMethod}
                          onLevelChange={handleSecurityLevelChange}
                        />
                        <motion.button
                          onClick={handleContinueWithSecurity}
                          className="w-full mt-6 py-4 px-6 rounded-2xl font-bold text-white transition-all text-base"
                          style={{
                            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 1) 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            boxShadow: '0 12px 32px rgba(16, 185, 129, 0.5)'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue with Selected Security Level
                        </motion.button>
                      </motion.div>
                    )}

                    {step === 'biometric' && (
                      <BiometricAuth
                        onBack={() => setStep('security')}
                        onComplete={handleCloseModal}
                      />
                    )}

                    {step === 'quantum' && (
                      <QuantumSecurity
                        onBack={() => setStep('security')}
                        onComplete={handleCloseModal}
                      />
                    )}

                    {step === 'forgot-password' && (
                      <ForgotPasswordFlow
                        onBack={handleBackToCredentials}
                        onComplete={handleForgotPasswordComplete}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AuthModal;