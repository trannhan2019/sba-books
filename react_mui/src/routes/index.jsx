import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Company from "@/pages/dashboard/Company";
import Login from "@/pages/auth/Login";
import Department from "@/pages/dashboard/Department";
import Role from "@/pages/dashboard/Role";
import User from "@/pages/dashboard/User";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/company" element={<Company />} />
        <Route path="/department" element={<Department />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
