'use client';

import React, { useState } from 'react';

// Define the interface for the TAIGExplorer component's props
interface TAIGExplorerProps {
  data: any; // The data to be explored
}

// Define a constant for domain colors
const domainColors = {
  'Assessment': 'blue',
  'Access': 'purple',
  'Verification': 'green',
  'Security': 'red',
  'Operationalisation': 'yellow',
  'Ecosystem Monitoring': 'indigo',
};

// Define a constant for lighter shades of domain colors
const lighterDomainColors = {
  'Assessment': 'blue-100',
  'Access': 'purple-100',
  'Verification': 'green-100',
  'Security': 'red-100',
  'Operationalisation': 'yellow-100',
  'Ecosystem Monitoring': 'indigo-100',
};

// Function to get the color class based on domain and depth
const getColorClass = (domain: string, depth: number) => {
  const baseColor = domainColors[domain as keyof typeof domainColors];
  const intensity = Math.max(900 - 0 * 200, 100);
  return `bg-${baseColor}-${intensity}`;
};

// TAIGExplorer component
const TAIGExplorer: React.FC<TAIGExplorerProps> = ({ data }) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  // Function to get the button class based on title and depth
  const getButtonClass = (title: string, depth: number) => {
    const baseClass = "w-full text-left font-semibold hover:bg-opacity-80 transition-colors duration-200 p-2 rounded mb-2";
    const colorClass = getColorClass(title, depth);
    return `${baseClass} ${colorClass}`;
  };

  // Function to render a column of data
  const renderColumn = (columnData: any, depth: number) => {
    return (
      <div className="w-full p-2">
        {Object.entries(columnData).map(([key, value]) => {
          const title = typeof value === 'object' && value !== null && !Array.isArray(value) 
            ? Object.keys(value)[0] || key 
            : key;
          const currentPath = [...selectedPath.slice(0, depth), key];

          const colorClass = depth === 0 ? getColorClass(title, depth) : getColorClass(selectedDomain, depth);
          
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedPath(currentPath);
                setSelectedDomain(depth === 0 ? title : selectedDomain);
              }}
              className={`w-full text-left font-semibold hover:bg-opacity-80 transition-colors duration-200 p-2 rounded mb-2 ${colorClass}`}
            >
              {title}
            </button>
          );
        })}
      </div>
    );
  };

  // Function to render questions
  const renderQuestions = (questions: string[]) => {
    return (
      <ul className="list-disc list-inside">
        {questions.map((question, index) => (
          <li key={index} className="mb-2 text-gray-300">{question}</li>
        ))}
      </ul>
    );
  };

  // Function to get the column data based on depth
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

  // Function to render the content based on the column data and depth
  const renderContent = (columnData: any, depth: number) => {
    if (Array.isArray(columnData)) {
      return renderQuestions(columnData);
    } 
    else if (typeof columnData === 'object') {
      return renderColumn(columnData, depth);
    }
    return null;
  };

  // Render the TAIGExplorer component
  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      {[0, 1, 2, 3].map((depth) => {
        const columnData = getColumnData(depth);
        return (
          <div key={depth} className="w-full md:w-1/4 mb-4 md:mb-0">
            {columnData && (
              <div className="p-4 rounded-lg bg-gray-800">
                <h2 className="text-xl font-bold mb-2">
                  {depth === 0 ? "Domains" :
                   depth === 1 ? "Subdomains" :
                   depth === 2 ? "Topics" :
                   "Questions"}
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