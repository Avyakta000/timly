import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path based on your project structure

const AdminRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user && user.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default AdminRoute;
