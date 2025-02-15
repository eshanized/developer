import React from "react";
import {
  Star,
  GitFork,
  Calendar,
  GitBranch,
  ExternalLink,
  Github,
  Gitlab,
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  source: "github" | "gitlab";
  createdAt: string;
  updatedAt: string;
}

const ProjectCard = ({
  title,
  description,
  language,
  stars,
  forks,
  url,
  source,
  createdAt,
  updatedAt,
}: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C++": "bg-purple-500",
      Ruby: "bg-red-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      PHP: "bg-indigo-500",
      Swift: "bg-pink-500",
    };
    return colors[lang] || "bg-gray-400";
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-white/50 dark:from-gray-700/50 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {source === "github" ? (
              <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Gitlab className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors line-clamp-1">
              {title}
            </h3>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        <div className="space-y-4 mt-auto">
          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
              <div
                className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(language)}`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {language}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <Star className="h-4 w-4" />
                <span className="text-sm">{stars}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <GitFork className="h-4 w-4" />
                <span className="text-sm">{forks}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="h-4 w-4" />
              <span>Updated: {formatDate(updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
