import React from 'react';

interface CategoryTitleProps {
  title: string;
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title }) => {
  return (
    <div className="bg-blue-800 text-white p-3 rounded text-center font-bold min-h-16 flex items-center justify-center">
      <span className="text-sm sm:text-base uppercase tracking-wide">{title}</span>
    </div>
  );
};

export default CategoryTitle;