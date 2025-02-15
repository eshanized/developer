import React from 'react';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
  source: 'devto' | 'medium';
}

const ArticleCard = ({ title, description, date, readTime, url, source }: ArticleCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{date}</span>
          </div>
          <span className="text-sm">{readTime} min read</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-black"
        >
          Read on {source === 'devto' ? 'Dev.to' : 'Medium'} →
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;