import { useLocation } from "react-router-dom";
import RectangleGroupIcon from "@heroicons/react/24/solid/RectangleGroupIcon";
import BuildingOffice2Icon from "@heroicons/react/24/solid/BuildingOffice2Icon";
import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { SidebarItem } from "./sidebar-item";

export const users = [
  {
    title: "Sách",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Lịch sử mượn trả",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
];

export const manages = [
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
