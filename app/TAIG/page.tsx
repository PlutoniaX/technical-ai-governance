import React from 'react';
import TAIGExplorerClient from '../../components/TAIGExplorerClient';
import taigData from '../../taig.json';

export default function TAIGPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center text-blue-400">Technical AI Governance Explorer</h1>
        <div className="bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
          <TAIGExplorerClient initialData={taigData.sections} />
        </div>
      </div>
    </div>
  );
}