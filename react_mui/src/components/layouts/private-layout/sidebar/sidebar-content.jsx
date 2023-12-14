import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import { Box, Divider, SvgIcon, Typography } from "@mui/material";
import Logo from "@/components/common/Logo";
import { Scrollbar } from "@/components/common/Scrollbar";
import { AdminContent } from "./admin-content";
import { ManagerContent } from "./manager-content";
import { UserContent } from "./user-content";
import LogoSba from "@/assets/logo_sba.png";

export function SidebarContent() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ padding: 1, display: "flex", justifyContent: "center" }}>
          <img width="75%" src={LogoSba} />
        </Box>
        {/* <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Devias
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Production
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box> */}
        <Divider sx={{ borderColor: "neutral.200" }} />
        {/* admin, manager,user */}
        {isLoggedIn && user?.role?.name === "administrator" && <AdminContent />}
        {isLoggedIn && user?.role?.name === "quản lý" && <ManagerContent />}
        {isLoggedIn && user?.role?.name === "người dùng" && <UserContent />}
      </Box>
    </Scrollbar>
  );
}
