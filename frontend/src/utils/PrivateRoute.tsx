import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  console.log('here private else')
  return user ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default PrivateRoute;
