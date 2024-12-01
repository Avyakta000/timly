import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store"; // Import the correct types
import { logout } from "../store/slices/authSlice";
import { FaClock } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Assuming user is stored in auth state
  const dispatch = useDispatch<AppDispatch>(); // Ensure dispatch is typed correctly
  const navigate = useNavigate();

  // since user is an empty object initially (local storage so inorder to check empty object user.?id or user.?fullName to prevent flickring)
  const handleLogout = async () => {
    try {
      // Dispatch the logout async action
      await dispatch(logout()).unwrap(); // unwrap() helps handle the result or error
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  console.log(user, 'user navbar')
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-around text-white">
      <Link
        to={"/"}
        className="flex items-center space-x-2 font-semibold text-xl mx-4"
      >
        {/* Clock Icon */}
        <FaClock className="text-gray-500 text-2xl" />
        <span className="text-indigo-600 hover:text-white">timly</span>
      </Link>

      <ul className="flex justify-center items-center space-x-4">
        {user?.role === "ADMIN" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {/* Show the Login link if not authenticated, else show Logout button */}
        {!user?.id ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <div onClick={handleLogout} className="text-white cursor-pointer">
              <MdOutlineLogout className="text-2xl" />
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
