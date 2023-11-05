import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import RectangleGroupIcon from "@heroicons/react/24/solid/RectangleGroupIcon";
import BuildingOffice2Icon from "@heroicons/react/24/solid/BuildingOffice2Icon";
import { SvgIcon } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const users = [
  {
    title: "Sách",
    path: "/admin/company",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Lịch sử mượn trả",
    path: "/admin/department",
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
    path: "/admin/company",
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    ),
  },
  {
    title: "Phòng Ban",
    path: "/admin/department",
    icon: (
      <SvgIcon fontSize="small">
        <RectangleGroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quyền tài khoản",
    path: "/admin/role",
    icon: <AdminPanelSettingsIcon fontSize="small" />,
  },
  {
    title: "Tài khoản",
    path: "/admin/user",
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    ),
  },
];
