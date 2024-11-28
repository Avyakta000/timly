import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="rounded-lg p-10 w-[90%] max-w-2xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
          Admin Panel
        </h1>
        <p className="text-gray-600 text-lg text-center">
          Welcome to the Admin Panel! Only authorized administrators can access this area.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
