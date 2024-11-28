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
    if(status==="idle"){
      dispatch(checkAuth());
    }
  }, [dispatch, status]);

  // if (status === "loading") {
  //   console.log('app.jsx')
  //   return null
  // }

  return (
    <>
      <Navbar />
      <main className="max-w-screen-lg h-screen mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
