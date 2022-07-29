import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.onload = () => {
      if (window.location.pathname.match(/\/Dashboard/i) && !token) {
        navigate("/Error");
      }
      if (window.location.pathname.match(/\/Dashboard/i) && token) {
        navigate("/Dashboard");
      }
    };
  }, [navigate, token]);

  const logOutHandler = () => {
    sessionStorage.clear("token");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center font-bold text-2xl">
      Dashboard
      <button
        onClick={logOutHandler}
        className="px-8 py-2 transition-all active:scale-110 cursor-pointer text-white bg-sky-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
