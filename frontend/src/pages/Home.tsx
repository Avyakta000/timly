import { useSelector } from 'react-redux';
import { RootState } from "../store";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user); // Access auth state with RootState

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Container */}
      <div className="rounded-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-4xl font-semibold text-indigo-600 mb-4">
          Welcome to the Task Manager
        </h1>
        <p className="text-lg text-gray-100 mb-6">
          Manage your tasks effectively and improve your productivity.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white py-2 px-6 rounded-md text-lg hover:bg-indigo-700 transition duration-300"
          >
            Get Started
          </Link>
          <Link
          to={"https://easymanage.quicklit.in"}
            className="bg-transparent border-2 border-indigo-600 text-indigo-500 py-2 px-6 rounded-md text-lg hover:bg-indigo-700 hover:text-white transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* If user is authenticated */}
      {isAuthenticated?.fullName && (
        <div className="mt-6 text-center text-lg text-gray-100">
          <p>Welcome back, {isAuthenticated.fullName}!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
