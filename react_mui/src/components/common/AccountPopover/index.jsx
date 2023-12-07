// import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { apiLogout } from "@/apis/auth";
import { setIsLoggedIn, setUser } from "@/store/auth/authSlice";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    onClose?.();
    await apiLogout();
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("token");
    navigate("/login");
    // console.log("logout");
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
        {/* <MenuItem onClick={handleSignOut}>Sign out</MenuItem> */}
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
