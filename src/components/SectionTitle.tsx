import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h2 className="section-title">{children}</h2>;
};

export default SectionTitle;