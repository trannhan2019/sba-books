import MainLayout from "@/layouts/MainLayout";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Admin;
