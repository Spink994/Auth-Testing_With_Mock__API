import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  const getTokenFromSession = sessionStorage.getItem("token");

  return (
    <div className="flex justify-center items-center max-w-[1920px] mx-auto h-screen bg-slate-200">
      <div className="w-[412px] min-w-[300px] mx-4">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />

            <Route
              path="/Dashboard"
              element={<Dashboard token={getTokenFromSession} />}
            />

            <Route path="/Error" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
