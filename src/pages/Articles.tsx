import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle, Search, Filter, SortAsc, SortDesc, BookOpen, Calendar, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ArticleCard from '../components/ArticleCard';
import { developerInfo } from '../info';

interface Article {
  id: string | number;
  title: string;
  description: string;
  published_at: string;
  reading_time_minutes: number;
  url: string;
  source: 'devto' | 'medium';
  tags?: string[];
}

interface FilterState {
  search: string;
  source: string;
  sortBy: 'date' | 'readTime';
  sortOrder: 'asc' | 'desc';
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    source: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const fetchArticles = async () => {
    setLoading(true);
    setError('');

    try {
      // Add retry logic with exponential backoff
      const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (err) {
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, retries - 1, delay * 2);
          }
          throw err;
        }
      };

      const [devtoRes, mediumRes] = await Promise.all([
        fetchWithRetry(`https://dev.to/api/articles?username=${developerInfo.social.devto}`),
        fetchWithRetry(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${developerInfo.social.medium}`)
      ]);

      // Transform Dev.to articles
      const transformedDevtoArticles = devtoRes.map((article: any) => ({
        id: `devto-${article.id}`,
        title: article.title,
        description: article.description,
        published_at: article.published_at,
        reading_time_minutes: article.reading_time_minutes,
        url: article.url,
        source: 'devto' as const,
        tags: article.tag_list
      }));

      // Transform Medium articles
      const transformedMediumArticles = mediumRes.items.map((article: any, index: number) => ({
        id: `medium-${index}`,
        title: article.title,
        description: article.description || article.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
        published_at: article.pubDate,
        reading_time_minutes: Math.ceil(article.content.split(' ').length / 200),
        url: article.link,
        source: 'medium' as const,
        tags: article.categories || []
      }));

      const allArticles = [...transformedDevtoArticles, ...transformedMediumArticles];
      setArticles(allArticles);
      setFilteredArticles(allArticles);
    } catch (err) {
      setError('Unable to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    let result = [...articles];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.source) {
      result = result.filter(article => article.source === filters.source);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
          break;
        case 'readTime':
          comparison = b.reading_time_minutes - a.reading_time_minutes;
          break;
      }
      return filters.sortOrder === 'desc' ? comparison : -comparison;
    });

    setFilteredArticles(result);
  }, [articles, filters]);

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient opacity-70" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionTitle>My Articles</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                <div className="h-6 bg-gray-200/50 dark:bg-gray-700/50 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200/50 dark:bg-gray-700/50 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200/50 dark:bg-gray-700/50 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient opacity-70" />
      
      {/* Content */}
      <div className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle>My Articles</SectionTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
              <BookOpen className="h-5 w-5 text-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
              <span>{filteredArticles.length} articles</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
              <button
                onClick={fetchArticles}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="mb-8 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100/50 dark:border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-300 dark:focus:border-purple-700 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>

              {/* Source Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-300 dark:focus:border-purple-700 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 appearance-none"
                  value={filters.source}
                  onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                >
                  <option value="">All Sources</option>
                  <option value="devto">Dev.to</option>
                  <option value="medium">Medium</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gradient-to-r from-pink-500 via-rose-500 to-red-500" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-300 dark:focus:border-purple-700 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 appearance-none"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                >
                  <option value="date">Publication Date</option>
                  <option value="readTime">Reading Time</option>
                </select>
              </div>

              {/* Sort Order */}
              <button
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white/90 dark:hover:bg-gray-700/90 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors text-gray-900 dark:text-gray-100"
                onClick={() => setFilters(prev => ({ 
                  ...prev, 
                  sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' 
                }))}
              >
                {filters.sortOrder === 'desc' ? (
                  <SortDesc className="h-4 w-4 text-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
                ) : (
                  <SortAsc className="h-4 w-4 text-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
                )}
                <span>{filters.sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
              </button>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div key={article.id} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 p-6 hover:bg-white/90 dark:hover:bg-gray-700/90">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {article.title}
                    </h3>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                    </a>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{article.description}</p>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          +{article.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gradient-to-r from-pink-500 via-rose-500 to-red-500" />
                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full">
                      {article.source === 'devto' ? 'Dev.to' : 'Medium'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;