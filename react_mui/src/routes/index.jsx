import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Admin from "@/pages/admin";
import Manager from "@/pages/manager";
import User from "@/pages/user";

import ManagerGuard from "@/components/guards/ManagerGuard";
import UserGuard from "@/components/guards/UserGuard";
import MainGuard from "@/components/guards/MainGuard";
import AdminCompany from "@/pages/admin/company";
import AdminDepartment from "@/pages/admin/department";
import AdminRole from "@/pages/admin/role";
import AdminUser from "@/pages/admin/user";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainGuard />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="company" element={<AdminCompany />} />
          <Route path="department" element={<AdminDepartment />} />
          <Route path="role" element={<AdminRole />} />
          <Route path="user" element={<AdminUser />} />
        </Route>

        <Route
          path="/manager"
          element={
            <ManagerGuard>
              <Manager />
            </ManagerGuard>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <UserGuard>
              <User />
            </UserGuard>
          }
        ></Route>

        {/* <Route path="/company" element={<Company />} />
        <Route path="/department" element={<Department />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} /> */}

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
