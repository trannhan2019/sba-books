import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, Outlet } from "react-router-dom";
import { TopNav } from "@/components/layouts/TopNav";
import { SideNav } from "@/components/layouts/SideNav";
import { users, manages } from "./SideNavData";
import AdminGuard from "@/components/guards/AdminGuard";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

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
    <AdminGuard>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        dataManageLink={manages}
        dataUserLink={users}
      />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </AdminGuard>
  );
};

export default Admin;