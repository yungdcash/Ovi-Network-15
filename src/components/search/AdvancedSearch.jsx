import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import TrackPlayer from '../music/TrackPlayer';
import { EnhancedMusicService } from '../../services/enhancedMusicService';

const { FiSearch, FiFilter, FiX, FiMusic, FiClock, FiUser, FiCalendar } = FiIcons;

function AdvancedSearch({ setCurrentTrack, setIsPlaying }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: 'All',
    sortBy: 'created_at',
    sortOrder: 'desc',
    minDuration: '',
    maxDuration: '',
    dateFrom: '',
    dateTo: '',
    verifiedOnly: false
  });

  const genres = [
    'All', 'Electronic', 'Hip Hop', 'Rock', 'Pop', 'Jazz', 
    'Classical', 'Ambient', 'Techno', 'House', 'Trap', 'R&B'
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Date Created' },
    { value: 'plays_count', label: 'Play Count' },
    { value: 'likes_count', label: 'Likes' },
    { value: 'title', label: 'Title' }
  ];

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() || Object.values(filters).some(v => v && v !== 'All' && v !== 'created_at' && v !== 'desc' && v !== false)) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const searchResults = await EnhancedMusicService.advancedSearch(searchQuery, {
        ...filters,
        limit: 24
      });
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      genre: 'All',
      sortBy: 'created_at',
      sortOrder: 'desc',
      minDuration: '',
      maxDuration: '',
      dateFrom: '',
      dateTo: '',
      verifiedOnly: false
    });
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'genre') return value !== 'All';
    if (key === 'sortBy') return value !== 'created_at';
    if (key === 'sortOrder') return value !== 'desc';
    if (key === 'verifiedOnly') return value === true;
    return value !== '';
  }).length;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Search Header */}
      <div className="card-3d p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" 
            />
            <input
              type="text"
              placeholder="Search tracks, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-3d w-full pl-12 pr-4"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            className={`btn-3d-secondary relative ${activeFiltersCount > 0 ? 'border-purple-500/50' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon icon={FiFilter} />
            <span className="ml-2">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Genre Filter */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Genre</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => updateFilter('genre', e.target.value)}
                    className="input-3d w-full"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="input-3d w-full"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Order</label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => updateFilter('sortOrder', e.target.value)}
                    className="input-3d w-full"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>

                {/* Duration Range */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Min Duration (seconds)</label>
                  <input
                    type="number"
                    placeholder="e.g. 60"
                    value={filters.minDuration}
                    onChange={(e) => updateFilter('minDuration', e.target.value)}
                    className="input-3d w-full"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Max Duration (seconds)</label>
                  <input
                    type="number"
                    placeholder="e.g. 300"
                    value={filters.maxDuration}
                    onChange={(e) => updateFilter('maxDuration', e.target.value)}
                    className="input-3d w-full"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">From Date</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                    className="input-3d w-full"
                  />
                </div>
              </div>

              {/* Verified Artists Toggle */}
              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-white/80">Verified Artists Only</span>
                </label>

                <motion.button
                  className="btn-3d-secondary text-sm"
                  onClick={clearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiX} className="mr-1" />
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results */}
      <div className="card-3d p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="loading-3d bg-white/5 rounded-xl h-64" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {results.length} Results {searchQuery && `for "${searchQuery}"`}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <TrackPlayer
                    track={track}
                    onPlay={handlePlayTrack}
                    isPlaying={false}
                  />
                </motion.div>
              ))}
            </div>
          </>
        ) : searchQuery || activeFiltersCount > 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SafeIcon icon={FiMusic} className="text-4xl text-white/40 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No Results Found</h3>
            <p className="text-white/60 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button 
              className="btn-3d-secondary"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SafeIcon icon={FiSearch} className="text-4xl text-white/40 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Search for Music</h3>
            <p className="text-white/60">
              Enter keywords or use filters to find tracks
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default AdvancedSearch;