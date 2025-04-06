import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { checkAuth } from "./store/slices/authSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(checkAuth());
    }
  }, [dispatch, status]);

  if (status === "loading" || status === "idle") {
    console.log('app.jsx')
    return null
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen max-w-screen-lg mx-auto">
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
