'use client';

import React, { useState } from 'react';

interface TAIGExplorerProps {
  data: any;
}

const sectionColors = [
  'from-blue-900 to-blue-700',
  'from-purple-900 to-purple-700',
  'from-green-900 to-green-700',
  'from-red-900 to-red-700',
];

const TAIGExplorer: React.FC<TAIGExplorerProps> = ({ data }) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const getButtonClass = (depth: number) => {
    const baseClass = "w-full text-left font-semibold hover:bg-opacity-80 transition-colors duration-200 p-2 rounded mb-2";
    const colorClass = sectionColors[depth];
    return `${baseClass} bg-gradient-to-r ${colorClass}`;
  };

  const renderColumn = (columnData: any, depth: number) => {
    return (
      <div className="w-full p-2">
        {Object.entries(columnData).map(([key, value]) => {
          const title = typeof value === 'object' && !Array.isArray(value) ? Object.keys(value)[0] : key;
          const currentPath = [...selectedPath.slice(0, depth), key];
          
          return (
            <button
              key={key}
              onClick={() => setSelectedPath(currentPath)}
              className={getButtonClass(depth)}
            >
              {title}
            </button>
          );
        })}
      </div>
    );
  };

  const renderQuestions = (questions: string[]) => {
    return (
      <ul className="list-disc list-inside">
        {questions.map((question, index) => (
          <li key={index} className="mb-2 text-gray-300">{question}</li>
        ))}
      </ul>
    );
  };

  const getColumnData = (depth: number) => {
    let currentData = data;
    for (let i = 0; i < depth; i++) {
      if (selectedPath[i] && currentData[selectedPath[i]]) {
        currentData = currentData[selectedPath[i]];
        if (typeof currentData === 'object' && !Array.isArray(currentData) && Object.keys(currentData).length === 1) {
          currentData = currentData[Object.keys(currentData)[0]];
        }
      } else {
        return null;
      }
    }
    return currentData;
  };

  const renderContent = (columnData: any, depth: number) => {
    if (Array.isArray(columnData)) {
      return renderQuestions(columnData);
    } else if (typeof columnData === 'object') {
      return renderColumn(columnData, depth);
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      {[0, 1, 2, 3].map((depth) => {
        const columnData = getColumnData(depth);
        return (
          <div key={depth} className="w-full md:w-1/4 mb-4 md:mb-0">
            {columnData && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">
                  {depth === 0 ? "Domains" :
                   depth === 1 ? "Subdomains" :
                   depth === 2 ? "Research Topics" :
                   "Research Questions"}
                </h2>
                {renderContent(columnData, depth)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TAIGExplorer;