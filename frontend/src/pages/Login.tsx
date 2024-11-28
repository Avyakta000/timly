import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { RootState, AppDispatch } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  // Accessing user from the Redux store
  const { user, status } = useSelector((state: RootState) => state.auth);
  
  // Local state for form fields
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(inputs));
  };

  // Redirection logic when the user is logged in
  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath, user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Login
          <span className="text-indigo-600 mx-2">timly</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              required
            />
          </div>
          <Link
            // to="/signup"
            to="https://easymanage.quicklit.in/signup"
            className="text-sm text-indigo-600 hover:underline mb-4 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 ${status === "loading" ? "opacity-75 cursor-not-allowed" : ""}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
