import { useCallback, useState, useEffect } from "react";
import AdminGuard from "@/components/guards/AdminGuard";
import { TopNav } from "@/components/layouts/TopNav";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "@/components/layouts/SideNav";
import MainLayout from "@/components/layouts/MainLayout";
import { users, manages } from "./SideNavData";

const Admin = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  return (
    // <AdminGuard>
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        dataManageLink={manages}
        dataUserLink={users}
      />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
    // </AdminGuard>
  );
};

export default Admin;
