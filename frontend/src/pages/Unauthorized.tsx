// src/pages/Unauthorized.tsx
import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">You are not authorized to view this page.</h1>
    </div>
  );
};

export default Unauthorized;
