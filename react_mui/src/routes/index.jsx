import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Companies from "@/pages/dashboard/Company";
import Login from "@/pages/auth/Login";
import Departments from "@/pages/dashboard/Department";
import Role from "@/pages/dashboard/Role";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/companie" element={<Companies />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/role" element={<Role />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
