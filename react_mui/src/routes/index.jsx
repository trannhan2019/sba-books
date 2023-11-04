import { BrowserRouter, Routes, Route } from "react-router-dom";
import Company from "@/pages/dashboard/Company";
import Login from "@/pages/auth/Login";
import Department from "@/pages/dashboard/Department";
import Role from "@/pages/dashboard/Role";
import User from "@/pages/dashboard/User";
import WrapProtect from "@/pages";
import Admin from "@/pages/admin";
import Manager from "@/pages/manager";
import AdminCompany from "@/pages/admin/AdminCompany";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WrapProtect />}></Route>

        <Route path="/company" element={<Company />} />
        <Route path="/department" element={<Department />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
