import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Tasks = lazy(() => import("./pages/Tasks"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-xl space-y-6">
    <div className="animate-pulse space-y-3">
        <div className="h-6 bg-green-600 rounded w-full"></div>
        <div className="h-6 bg-green-600 rounded w-full"></div>
        <div className="h-6 bg-green-600 rounded w-full"></div>
        <div className="h-6 bg-green-600 rounded w-full"></div>
      </div>
     
      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-green-700 rounded w-full"></div>
        <div className="h-6 bg-green-700 rounded w-full"></div>
        <div className="h-6 bg-green-700 rounded w-full"></div>
        <div className="h-6 bg-green-700 rounded w-full"></div>
      </div>

      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
      </div>

      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
        <div className="h-6 bg-green-800 rounded w-full"></div>
      </div>

    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
