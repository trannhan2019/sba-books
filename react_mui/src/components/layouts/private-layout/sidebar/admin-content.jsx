import { useLocation } from "react-router-dom";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import RectangleGroupIcon from "@heroicons/react/24/solid/RectangleGroupIcon";
import BuildingOffice2Icon from "@heroicons/react/24/solid/BuildingOffice2Icon";
import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SidebarItem } from "./sidebar-item";

export const users = [
  {
    title: "Sách",
    path: "/company",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Lịch sử mượn trả",
    path: "/department",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
];

export const manages = [
  {
    title: "Công ty",
    path: "/company",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Phòng Ban",
    path: "/department",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quyền tài khoản",
    path: "/role",
    icon: <AdminPanelSettingsIcon fontSize="small" />,
  },
  {
    title: "Tài khoản",
    path: "/user",
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh mục sách",
    path: "/category-book",
    icon: <CategoryIcon fontSize="small" />,
  },
  {
    title: "Quản lý sách",
    path: "/book",
    icon: <AutoStoriesIcon fontSize="small" />,
  },
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
