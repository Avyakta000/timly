import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../store/slices/statsSlice";
import { RootState, AppDispatch } from "../store";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa"; // React Icons
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { RiHome3Line } from "react-icons/ri";

const Dashboard: React.FC = () => {
  // Accessing stats and user state from the Redux store
  const { stats, status } = useSelector((state: RootState) => state.stats); // Access stats state
  const { user } = useSelector((state: RootState) => state.auth); // Access user state

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch stats if user is available and status is idle
    if (user && status === "idle") {
      dispatch(fetchStats());
    }
  }, [dispatch, status, user]);

  // Render loading or error states
  // if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading stats</div>;

  const handleProfileEdit = () => {
    // window.location.href = "https://easymanage.quicklit.in/dashboard/profile";
    window.location.href = "http://localhost:5174/dashboard/profile";
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-blue-900 text-white w-64 p-6 space-y-6">
        <ul>
          <li className="py-2 hover:bg-blue-700 px-2 rounded-md cursor-pointer">
            <Link to={`${user ? "/dashboard" : "/"}`}><RiHome3Line className="inline-block mr-2" /> Home</Link>
          </li>
          <li className="py-2 hover:bg-blue-700 px-2 rounded-md cursor-pointer">
            <Link to="/tasks" className="w-full"><GoTasklist className="inline-block mr-2"/>Tasks</Link>
          </li>
          <li
            onClick={handleProfileEdit}
            className="py-2 hover:bg-blue-700 px-2 rounded-md cursor-pointer"
          >
            <IoSettingsOutline className="inline-block mr-2" />Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">
            Welcome to Your Dashboard,{" "}
            <span className="text-blue-700">{user?.fullName}</span>
          </h1>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<FaTasks />}
            title="Total Tasks"
            value={stats.totalTasks}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatsCard
            icon={<FaCheckCircle />}
            title="Completed Tasks"
            value={stats.completedTasks}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatsCard
            icon={<FaClock />}
            title="Pending Tasks"
            value={stats.pendingTasks}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
          <StatsCard
            icon={<FaChartLine />}
            title="Average Completion Time"
            value={stats.averageCompletionTime}
            bgColor="bg-yellow-100"
            textColor="text-yellow-600"
          />
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Time Lapsed"
            value={stats.timeLapsed + " hrs"}
            bgColor="bg-gray-100"
            textColor="text-gray-600"
          />
          <StatsCard
            title="Estimated Time Left"
            value={stats.estimatedTimeLeft + " hrs"}
            bgColor="bg-gray-100"
            textColor="text-gray-600"
          />
          <StatsCard
            title="Pending Percentage"
            value={stats.pendingPercentage + "%"}
            bgColor="bg-gray-100"
            textColor="text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

// StatsCard Component to render each stat
interface StatsCardProps {
  icon?: JSX.Element;
  title: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  bgColor,
  textColor,
}) => {
  return (
    <div className={`p-6 shadow-lg rounded-lg ${bgColor}`}>
      <div className="flex items-center justify-center space-x-4">
        {icon && <div className={`text-2xl ${textColor}`}>{icon}</div>}
        <div>
          <h3 className="text-md font-medium text-gray-600">{title}</h3>
          <p className={`text-xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
