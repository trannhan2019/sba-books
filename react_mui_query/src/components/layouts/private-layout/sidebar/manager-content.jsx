import { useLocation } from "react-router-dom";
import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SidebarItem } from "./sidebar-item";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export const users = [
  {
    title: "Sách",
    path: "/",
    icon: <AutoStoriesIcon fontSize="small" />,
  },
  {
    title: "Lịch sử mượn trả",
    path: "/book-history",
    icon: <HistoryIcon fontSize="small" />,
  },
  {
    title: "Thông tin tài khoản",
    path: "/account",
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
  },
];

export const manages = [
  //thong ke sach muon nhieu, nguoi muon nhieu
  {
    title: "Tổng quan",
    path: "/manage-overview",
    icon: <BarChartOutlinedIcon fontSize="small" />,
  },
  {
    title: "Danh mục sách",
    path: "/manage-category-book",
    icon: <CategoryIcon fontSize="small" />,
  },
  {
    title: "Quản lý sách",
    path: "/manage-book",
    icon: <ManageSearchIcon fontSize="small" />,
  },
  //quan ly muon tra
  {
    title: "Quản lý mượn trả sách",
    path: "/manage-book-history",
    icon: <MenuBookOutlinedIcon fontSize="small" />,
  },
];

export function ManagerContent() {
  const location = useLocation();
  return (
    <>
      {/* NGUOI DUNG */}
      <Box
        component="nav"
        sx={{
          flexGrow: 0,
          px: 2,
          py: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "neutral.500", mb: 2 }}>
          Người dùng
        </Typography>
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {users.map((item) => {
            const active = item.path ? location.pathname === item.path : false;

            return (
              <SidebarItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
      {/* QUAN LY */}
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "neutral.500", mb: 2 }}>
          Quản lý
        </Typography>
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {manages.map((item) => {
            const active = item.path ? location.pathname === item.path : false;

            return (
              <SidebarItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
