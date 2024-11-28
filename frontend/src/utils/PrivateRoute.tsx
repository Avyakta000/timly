import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path based on your project structure

const PrivateRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  console.log('here private else')
  return user ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default PrivateRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { CircleLoader } from 'react-spinners';

// const PrivateRoute: React.FC = () => {
//   const { user, status } = useSelector((state: RootState) => state.auth);

//   // Show loader while the auth status is being determined
//   if (status === 'loading') {
//     console.log('here loading')
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <CircleLoader color="#4A90E2" size={100} />
//       </div>
//     );
//   }

//   // If user is authenticated, render the protected route
//   if (status === 'succeeded' && user) {
//     console.log('here user and succeded')
//     return <Outlet />;
//   }
//   console.log('naviate to login')
//   // If authentication failed or no user is found, redirect to login
//   return <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
