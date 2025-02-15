import React from "react";
import { Briefcase } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string;
}

const ExperienceCard = ({
  company,
  position,
  period,
  description,
}: ExperienceCardProps) => {
  return (
    <div className="card bg-white/90 dark:bg-gray-700/90 p-4 md:p-6">
      <div className="flex items-start space-x-3 md:space-x-4">
        <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg shrink-0">
          <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {position}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-2">
            {company} • {period}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
