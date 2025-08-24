import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiFilter, FiMusic, FiTrendingUp, FiClock, FiHeart, FiPlay } = FiIcons;

function Discover({ setCurrentTrack, setIsPlaying }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');

  const genres = ['All', 'Electronic', 'Hip Hop', 'Rock', 'Pop', 'Jazz', 'Classical', 'Ambient'];

  const tracks = [
    {
      id: 1,
      title: 'Quantum Synthesis',
      artist: 'NeuroWave',
      genre: 'Electronic',
      duration: '4:32',
      plays: '3.2M',
      likes: '245K',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      trending: true,
      new: false,
    },
    {
      id: 2,
      title: 'Digital Dreamscape',
      artist: 'CyberSonic',
      genre: 'Ambient',
      duration: '6:18',
      plays: '1.8M',
      likes: '156K',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
      trending: false,
      new: true,
    },
    {
      id: 3,
      title: 'Neon Nights',
      artist: 'ElectroVibe',
      genre: 'Electronic',
      duration: '5:12',
      plays: '2.1M',
      likes: '178K',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      trending: true,
      new: false,
    },
    {
      id: 4,
      title: 'Cosmic Beats',
      artist: 'StarWave',
      genre: 'Electronic',
      duration: '3:45',
      plays: '892K',
      likes: '67K',
      cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      trending: false,
      new: true,
    },
    {
      id: 5,
      title: 'Urban Flow',
      artist: 'BeatMaster',
      genre: 'Hip Hop',
      duration: '4:01',
      plays: '1.5M',
      likes: '112K',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      trending: true,
      new: false,
    },
    {
      id: 6,
      title: 'Midnight Jazz',
      artist: 'SmoothGroove',
      genre: 'Jazz',
      duration: '7:23',
      plays: '654K',
      likes: '45K',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      trending: false,
      new: false,
    },
  ];

  const filteredTracks = tracks.filter(track => {
    const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre;
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.trending - a.trending;
      case 'newest':
        return b.new - a.new;
      case 'popular':
        return parseInt(b.likes.replace('K', '000').replace('M', '000000')) - 
               parseInt(a.likes.replace('K', '000').replace('M', '000000'));
      default:
        return 0;
    }
  });

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover Music</h1>
          <p className="text-gray-400">Explore the latest tracks from creators worldwide</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tracks, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 w-64"
            />
          </div>

          <motion.button
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiFilter} className="text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <motion.button
            key={genre}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => setSelectedGenre(genre)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {genre}
          </motion.button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-400">Sort by:</span>
        {[
          { key: 'trending', label: 'Trending', icon: FiTrendingUp },
          { key: 'newest', label: 'Newest', icon: FiClock },
          { key: 'popular', label: 'Most Liked', icon: FiHeart },
        ].map((option) => (
          <motion.button
            key={option.key}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all ${
              sortBy === option.key
                ? 'bg-purple-600/30 text-purple-300'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setSortBy(option.key)}
            whileHover={{ scale: 1.05 }}
          >
            <SafeIcon icon={option.icon} className="text-sm" />
            <span className="text-sm">{option.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-gray-400">
        {sortedTracks.length} tracks found
        {searchTerm && ` for "${searchTerm}"`}
        {selectedGenre !== 'All' && ` in ${selectedGenre}`}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortedTracks.map((track, index) => (
          <motion.div
            key={track.id}
            className="bg-black/30 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => {
              setCurrentTrack(track);
              setIsPlaying(true);
            }}
          >
            {/* Cover Art */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full aspect-square object-cover transition-transform group-hover:scale-110"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {track.trending && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    Trending
                  </span>
                )}
                {track.new && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    New
                  </span>
                )}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.button
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SafeIcon icon={FiPlay} className="text-white text-xl ml-1" />
                </motion.button>
              </div>
            </div>

            {/* Track Info */}
            <div>
              <h3 className="text-white font-semibold mb-1 line-clamp-2">{track.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{track.genre}</span>
                <span>{track.duration}</span>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-400">{track.plays} plays</span>
                <span className="text-red-400">{track.likes} likes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {sortedTracks.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SafeIcon icon={FiMusic} className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">No tracks found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Load More */}
      {sortedTracks.length > 0 && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button className="bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity">
            Load More Tracks
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Discover;