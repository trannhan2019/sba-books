import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "@/hooks/use-popover";
import { AccountPopover } from "@/components/common/AccountPopover";
import UserDefaultAvatar from "@/assets/user-default-image.png";
import { NotificationsButton } from "@/components/common/NotificationPopover/button";
import { useSelector } from "react-redux";
import { getUrlImage } from "@/utils/get-url-image";

const SIDE_NAV_WIDTH = 270;
const TOP_NAV_HEIGHT = 64;

const Header = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>

          <Stack alignItems="center" direction="row" spacing={3}>
            {/* NOTIFICATIONS */}
            <NotificationsButton />

            {/* ACCOUNT */}
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src={user?.photo ? getUrlImage(user.photo) : UserDefaultAvatar}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

export default Header;
