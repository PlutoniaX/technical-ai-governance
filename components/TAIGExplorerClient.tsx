'use client';

import React, { useState, useEffect } from 'react';
import TAIGExplorer from './TAIGExplorer';

interface TAIGExplorerClientProps {
  initialData: any;
}

const TAIGExplorerClient: React.FC<TAIGExplorerClientProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (!data) return <div>Loading...</div>;

  return <TAIGExplorer data={data} />;
}

export default TAIGExplorerClient;