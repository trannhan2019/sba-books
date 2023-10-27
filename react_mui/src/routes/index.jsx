import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Companies from "@/pages/dashboard/Companies";
import Login from "@/pages/auth/Login";
import Departments from "@/pages/dashboard/Departments";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
