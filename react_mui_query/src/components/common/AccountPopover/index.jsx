// import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { apiLogout } from "@/apis/auth";
import { clearAuthStore, setIsLoggedIn, setUser } from "@/store/auth/authSlice";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { clearAppStore } from "@/store/app/appSlice";
import { clearBookStore } from "@/store/book/bookSlice";
import { clearCateBookStore } from "@/store/category_book/catebookSlice";
import { clearCompanyStore } from "@/store/company/companySlice";
import { clearDepartmentStore } from "@/store/department/departmentSlice";
import { clearNotifyStore } from "@/store/notify/notifySlice";
import { clearRoleStore } from "@/store/role/roleSlice";
import { clearUserStore } from "@/store/user/userSlice";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    onClose?.();
    await apiLogout();

    dispatch(clearAppStore());
    dispatch(clearAuthStore());
    dispatch(clearBookStore());
    dispatch(clearCateBookStore());
    dispatch(clearCompanyStore());
    dispatch(clearDepartmentStore());
    dispatch(clearNotifyStore());
    dispatch(clearRoleStore());
    dispatch(clearUserStore());

    localStorage.clear();
    navigate("/login");
    // console.log("logout");
  };

  const handleDeleteCache = () => {
    dispatch(clearAppStore());
    dispatch(clearAuthStore());
    dispatch(clearBookStore());
    dispatch(clearCateBookStore());
    dispatch(clearCompanyStore());
    dispatch(clearDepartmentStore());
    dispatch(clearNotifyStore());
    dispatch(clearRoleStore());
    dispatch(clearUserStore());
    localStorage.clear();
    navigate("/login");
  };

  const showAccountInfo = () => {
    onClose?.();
    navigate("/account");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={showAccountInfo}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Tài khoản</ListItemText>
        </MenuItem>

        {/* <MenuItem onClick={handleDeleteCache}>Xoá dữ liệu tạm</MenuItem> */}
        <MenuItem onClick={handleDeleteCache}>
          <ListItemIcon>
            <AutorenewOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xoá dữ liệu tạm</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
