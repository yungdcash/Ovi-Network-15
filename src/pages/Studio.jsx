import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMic, FiPlay, FiPause, FiSave, FiDownload, FiSettings, FiLayers, FiVolume2, FiZap } = FiIcons;

function Studio() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const tracks = [
    { id: 1, name: 'Main Beat', color: 'bg-blue-500', volume: 80, muted: false },
    { id: 2, name: 'Bass Line', color: 'bg-green-500', volume: 65, muted: false },
    { id: 3, name: 'Melody', color: 'bg-purple-500', volume: 75, muted: false },
    { id: 4, name: 'Drums', color: 'bg-red-500', volume: 90, muted: false },
  ];

  const effects = [
    { name: 'Reverb', active: true },
    { name: 'Delay', active: false },
    { name: 'Distortion', active: false },
    { name: 'Filter', active: true },
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quantum Beat Studio</h1>
          <p className="text-gray-400">Professional music production in your browser</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiSave} className="mr-2" />
            Save Project
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiDownload} className="mr-2" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Track Mixer */}
        <div className="lg:col-span-3 space-y-6">
          {/* Transport Controls */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90'
                }`}
                onClick={() => setIsRecording(!isRecording)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiMic} />
              </motion.button>
              
              <motion.button
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl hover:opacity-90 transition-opacity"
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="ml-1" />
              </motion.button>
              
              <motion.button
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SafeIcon icon={FiSettings} />
              </motion.button>
            </div>
            
            {/* Timeline */}
            <div className="mt-6 h-2 bg-gray-800 rounded-full relative">
              <div className="h-full w-1/3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
            </div>
          </motion.div>

          {/* Track Channels */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Tracks</h3>
            
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedTrack === index 
                      ? 'bg-white/10 border-neon-blue' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedTrack(index)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 ${track.color} rounded-full`}></div>
                    <span className="text-white font-medium flex-1">{track.name}</span>
                    
                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiVolume2} className="text-gray-400" />
                      <div className="w-20 h-1 bg-gray-700 rounded-full relative">
                        <div 
                          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                          style={{ width: `${track.volume}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-8">{track.volume}</span>
                    </div>
                    
                    <motion.button
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiSettings} />
                    </motion.button>
                  </div>
                  
                  {/* Waveform Visualization */}
                  <div className="mt-3 flex items-center space-x-1 h-8">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 ${track.color} rounded-full opacity-50`}
                        style={{ height: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Effects & Tools Panel */}
        <div className="space-y-6">
          {/* Effects */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <SafeIcon icon={FiZap} className="mr-2" />
              Effects
            </h3>
            
            <div className="space-y-3">
              {effects.map((effect, index) => (
                <motion.div
                  key={effect.name}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    effect.active 
                      ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{effect.name}</span>
                    <div className={`w-4 h-4 rounded-full ${effect.active ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instruments */}
          <motion.div
            className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <SafeIcon icon={FiLayers} className="mr-2" />
              Instruments
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {['Synth', 'Piano', 'Guitar', 'Drums'].map((instrument, index) => (
                <motion.button
                  key={instrument}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  {instrument}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* AI Assistant */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">AI Assistant</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get AI-powered suggestions for your track
            </p>
            <button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Generate Ideas
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Studio;