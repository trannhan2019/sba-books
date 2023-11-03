import { BrowserRouter, Routes, Route } from "react-router-dom";
import Company from "@/pages/dashboard/Company";
import Login from "@/pages/auth/Login";
import Department from "@/pages/dashboard/Department";
import Role from "@/pages/dashboard/Role";
import User from "@/pages/dashboard/User";
import WrapProtect from "@/pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WrapProtect />} />

        <Route path="/company" element={<Company />} />
        <Route path="/department" element={<Department />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
