import React from "react";

interface SkillBadgeProps {
  skill: string;
  color?: string;
  count?: number;
  showDot?: boolean;
}

const SkillBadge = ({
  skill,
  color,
  count,
  showDot = false,
}: SkillBadgeProps) => {
  return (
    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 hover:shadow-md transition-shadow flex items-center space-x-1.5 md:space-x-2">
      {showDot && color && (
        <span
          className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full inline-block"
          style={{ backgroundColor: color }}
        />
      )}
      <span>{skill}</span>
      {count !== undefined && (
        <span className="bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full text-xs text-gray-700 dark:text-gray-300">
          {count}
        </span>
      )}
    </span>
  );
};

export default SkillBadge;
