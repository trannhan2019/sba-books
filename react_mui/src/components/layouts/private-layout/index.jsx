import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";

const SIDE_NAV_WIDTH = 270;

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

const PrivateLayout = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [location.pathname]);

  if (!isLoggedIn || !user) return <Navigate to={"/login"} />;

  return (
    <Box>
      <Header onNavOpen={() => setOpenNav(true)} />
      <Sidebar onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </Box>
  );
};

export default PrivateLayout;
