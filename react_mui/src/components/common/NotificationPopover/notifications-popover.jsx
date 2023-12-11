// import { format } from "date-fns";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Scrollbar } from "@/components/common/Scrollbar";

const renderContent = (notification) => {
  // const createdAt = format(notification.createdAt, "MMM dd, h:mm a");

  return (
    <>
      <ListItemText
        primary={
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ mr: 0.5 }} variant="subtitle2">
              {notification?.data.sender.name}
            </Typography>
            <Typography sx={{ mr: 0.5 }} variant="body2">
              added a new job
            </Typography>
            <Link href="#" underline="always" variant="body2">
              {notification?.data.book.title}
            </Link>
          </Box>
        }
        secondary={
          <Typography color="text.secondary" variant="caption">
            Thoi gian
          </Typography>
        }
        sx={{ my: 0 }}
      />
    </>
  );
};

export const NotificationsPopover = (props) => {
  const { anchorEl, notifications, onClose, open = false, ...other } = props;

  const isEmpty = notifications.length === 0;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      disableScrollLock
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 380 } }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography color="inherit" variant="h6">
          Notifications
        </Typography>
        <EmailOutlinedIcon />
      </Stack>
      <Divider />
      {isEmpty ? (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">
            There are no notifications
          </Typography>
        </Box>
      ) : (
        <Scrollbar sx={{ maxHeight: 400 }}>
          <List disablePadding>
            {notifications.map((notification) => (
              <ListItem
                divider
                key={notification.id}
                sx={{
                  alignItems: "flex-start",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  "& .MuiListItemSecondaryAction-root": {
                    top: "24%",
                  },
                }}
              >
                {renderContent(notification)}
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      )}
    </Popover>
  );
};
