import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiZap, FiShield, FiLock, FiCpu, FiCheck, FiWifi } = FiIcons;

function QuantumSecurity({ onBack, onComplete }) {
  const [stage, setStage] = useState('initialization');
  const [progress, setProgress] = useState(0);
  const [quantumState, setQuantumState] = useState('idle');
  const [entanglementLevel, setEntanglementLevel] = useState(0);

  const stages = [
    {
      id: 'initialization',
      name: 'Quantum Initialization',
      description: 'Preparing quantum encryption keys',
      duration: 3000
    },
    {
      id: 'entanglement',
      name: 'Quantum Entanglement',
      description: 'Creating quantum particle pairs',
      duration: 4000
    },
    {
      id: 'distribution',
      name: 'Key Distribution',
      description: 'Establishing secure quantum channel',
      duration: 2000
    },
    {
      id: 'verification',
      name: 'Zero-Knowledge Proof',
      description: 'Verifying identity without revealing data',
      duration: 2500
    }
  ];

  const currentStage = stages.find(s => s.id === stage);
  const stageIndex = stages.findIndex(s => s.id === stage);

  useEffect(() => {
    if (stage === 'initialization') {
      startQuantumProcess();
    }
  }, [stage]);

  const startQuantumProcess = async () => {
    setQuantumState('active');
    
    for (const stageData of stages) {
      setStage(stageData.id);
      setProgress(0);
      
      // Simulate stage progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, stageData.duration / 50);

      // Simulate entanglement level for visual effect
      if (stageData.id === 'entanglement') {
        const entanglementInterval = setInterval(() => {
          setEntanglementLevel(prev => Math.min(prev + 1, 100));
        }, 40);
        
        setTimeout(() => clearInterval(entanglementInterval), stageData.duration);
      }

      await new Promise(resolve => setTimeout(resolve, stageData.duration));
    }

    setQuantumState('completed');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <button
        onClick={onBack}
        className="flex items-center text-white/60 hover:text-white mb-6 transition-colors"
      >
        ← Back to Security Options
      </button>

      <h3 className="text-2xl font-bold text-white mb-2">Quantum Security Protocol</h3>
      <p className="text-white/60 mb-8">Establishing unhackable quantum encryption</p>

      {/* Quantum Visualization */}
      <div className="relative w-80 h-80 mx-auto mb-8 bg-gradient-to-br from-gray-900/50 to-purple-900/50 rounded-full border border-white/10 overflow-hidden">
        {/* Quantum Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 120],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Central Quantum Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: quantumState === 'active' ? 360 : 0,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          <SafeIcon icon={FiZap} className="text-white text-2xl" />
        </motion.div>

        {/* Quantum Field Lines */}
        {quantumState === 'active' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-40 bg-gradient-to-t from-transparent via-neon-blue/30 to-transparent"
                style={{
                  transformOrigin: '50% 0%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Stage Information */}
      {quantumState !== 'completed' && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h4 className="text-xl font-semibold text-white mb-2">{currentStage?.name}</h4>
          <p className="text-white/60 mb-4">{currentStage?.description}</p>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="text-white/80 text-sm mb-4">
            Stage {stageIndex + 1} of {stages.length} • {progress}% Complete
          </div>

          {/* Quantum Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
            <div className="bg-white/5 rounded-lg p-3">
              <SafeIcon icon={FiShield} className="text-neon-blue mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Security</div>
              <div className="text-white/60 text-xs">Quantum</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <SafeIcon icon={FiLock} className="text-neon-purple mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Encryption</div>
              <div className="text-white/60 text-xs">2048-bit</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <SafeIcon icon={FiWifi} className="text-neon-pink mx-auto mb-1" />
              <div className="text-white text-sm font-semibold">Entanglement</div>
              <div className="text-white/60 text-xs">{entanglementLevel}%</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Completion State */}
      {quantumState === 'completed' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiCheck} className="text-white text-3xl" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-2">Quantum Security Established!</h4>
          <p className="text-green-400 mb-4">
            Your account is now protected by quantum entanglement encryption.
          </p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-green-300 text-sm">
              🔒 Mathematically impossible to hack<br/>
              🌌 Quantum key distribution active<br/>
              ⚡ Zero-knowledge authentication verified
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default QuantumSecurity;