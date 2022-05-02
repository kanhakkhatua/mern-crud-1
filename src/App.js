import "./App.css";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "./pages/Dashboard";

import UserBooks from "./pages/user/UserBooks";
import UserProfile from "./pages/user/UserProfile";

import AdminAlluser from "./pages/admin/AllUser";
import AdminBooks from "./pages/admin/AdminBooks";
import BooksCategory from "./pages/admin/BooksCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="userbooks" element={<UserBooks />} />
            <Route path="userprofile" element={<UserProfile />} />

            <Route path="alluser" element={<AdminAlluser />} />
            <Route path="adminbooks" element={<AdminBooks />} />
            <Route path="bookcategory" element={<BooksCategory />} />
          </Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
