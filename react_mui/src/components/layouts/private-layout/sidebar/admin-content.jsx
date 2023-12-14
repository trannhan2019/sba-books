import { useLocation } from "react-router-dom";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import RectangleGroupIcon from "@heroicons/react/24/solid/RectangleGroupIcon";
import BuildingOffice2Icon from "@heroicons/react/24/solid/BuildingOffice2Icon";
import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SidebarItem } from "./sidebar-item";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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
  {
    title: "Công ty",
    path: "/manage-company",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Phòng Ban",
    path: "/manage-department",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quyền tài khoản",
    path: "/manage-role",
    icon: <AdminPanelSettingsIcon fontSize="small" />,
  },
  {
    title: "Tài khoản",
    path: "/manage-user",
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh mục sách",
    path: "/manage-category-book",
    icon: <CategoryIcon fontSize="small" />,
  },
  {
    title: "Quản lý sách",
    path: "/manage-book",
    icon: <AutoStoriesIcon fontSize="small" />,
  },
  //quan ly muon tra
  {
    title: "Quản lý mượn trả sách",
    path: "/manage-book-history",
    icon: <MenuBookOutlinedIcon fontSize="small" />,
  },
  //thong ke sach muon nhieu, nguoi muon nhieu
];

export function AdminContent() {
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
