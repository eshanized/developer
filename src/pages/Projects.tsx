import React, { useState, useEffect } from 'react';
import { AlertCircle, Search, Filter, SortAsc, SortDesc, Code2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

interface FilterState {
  search: string;
  language: string;
  sortBy: 'stars' | 'forks' | 'updated' | 'created';
  sortOrder: 'asc' | 'desc';
}

const Projects = () => {
  const { projects: allProjects, loading, error: fetchError } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [languages, setLanguages] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    language: '',
    sortBy: 'updated',
    sortOrder: 'desc'
  });

  useEffect(() => {
    if (allProjects.length > 0) {
      const uniqueLanguages = Array.from(new Set(allProjects.map(p => p.language).filter(Boolean)));
      setLanguages(uniqueLanguages.sort());
    }
  }, [allProjects]);

  useEffect(() => {
    let result = [...allProjects];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        (project.description && project.description.toLowerCase().includes(searchLower))
      );
    }

    if (filters.language) {
      result = result.filter(project => project.language === filters.language);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'stars':
          comparison = b.stargazers_count - a.stargazers_count;
          break;
        case 'forks':
          comparison = b.forks_count - a.forks_count;
          break;
        case 'updated':
          comparison = new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          break;
        case 'created':
          comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
      }
      return filters.sortOrder === 'desc' ? comparison : -comparison;
    });

    setFilteredProjects(result);
  }, [allProjects, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>My Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card animate-pulse dark:bg-gray-800">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>My Projects</SectionTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
            <Code2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span>{filteredProjects.length} projects</span>
          </div>
        </div>
        
        {fetchError && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            <p className="text-yellow-700 dark:text-yellow-200">{fetchError}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:border-indigo-300 dark:focus:border-indigo-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>

            {/* Language Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500 dark:text-purple-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:border-purple-300 dark:focus:border-purple-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
              >
                <option value="">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500 dark:text-green-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 focus:border-green-300 dark:focus:border-green-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              >
                <option value="updated">Last Updated</option>
                <option value="created">Created Date</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
              </select>
            </div>

            {/* Sort Order */}
            <button
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 group transition-colors"
              onClick={() => setFilters(prev => ({ 
                ...prev, 
                sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' 
              }))}
            >
              {filters.sortOrder === 'desc' ? (
                <SortDesc className="h-4 w-4 text-rose-500 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300" />
              ) : (
                <SortAsc className="h-4 w-4 text-rose-500 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300" />
              )}
              <span>{filters.sortOrder === 'desc' ? 'Descending' : 'Ascending'}</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.name}
                description={project.description || 'No description available'}
                language={project.language || 'N/A'}
                stars={project.stargazers_count}
                forks={project.forks_count}
                url={project.html_url}
                source={project.html_url.includes('github') ? 'github' : 'gitlab'}
                createdAt={project.created_at}
                updatedAt={project.updated_at}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;