import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

function Dashboard() {
  const token = JSON.parse(localStorage.getItem("token"));
  const isUserType = () => {
    if (token.userType === "user") {
      return true;
    } else {
      return false;
    }
  };

  return <>{isUserType() ? <UserDashboard /> : <AdminDashboard />}</>;
}

export default Dashboard;
