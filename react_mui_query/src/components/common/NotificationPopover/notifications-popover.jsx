import { format } from "date-fns";
// import vi from "date-fns/locale/vi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Badge,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { Scrollbar } from "@/components/common/Scrollbar";
import { apiUpdateBookNotification } from "@/apis/notify";

export const NotificationsPopover = (props) => {
  const {
    anchorEl,
    notifications,
    onClose,
    open = false,
    fetchData,
    ...other
  } = props;
  const navigate = useNavigate();

  const handleClickItem = async (id) => {
    await apiUpdateBookNotification(id);
    await fetchData();
    onClose();
    navigate("/manage-book-history");
  };

  const isEmpty = notifications.length === 0;
  //co the switch case cho cac truong hop thong bao khac -> tham khao notification Devias
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
                {/* {renderContent(notification, onClose)} */}
                <ListItemText
                  onClick={() => handleClickItem(notification.id)}
                  sx={{ my: 0, cursor: "pointer" }}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Badge
                      invisible={!!notification?.read_at}
                      color="primary"
                      badgeContent="new"
                      sx={{ width: "100%" }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ mr: 0.5 }} variant="subtitle2">
                        <b>{notification?.data.sender.name}</b>
                        {notification?.data.history.returned_at
                          ? " đã trả sách "
                          : " đã mượn sách "}
                        <b>{notification?.data.book.title}</b>
                        {" lúc "}
                        <b>
                          {notification?.data.history.returned_at
                            ? format(
                                new Date(
                                  notification?.data.history.returned_at
                                ),
                                "HH:mm - dd/MM/yyyy"
                              )
                            : format(
                                new Date(
                                  notification?.data.history.exchanged_at
                                ),
                                "HH:mm - dd/MM/yyyy"
                              )}
                        </b>
                      </Typography>
                    </Badge>
                  </Box>
                </ListItemText>
              </ListItem>
            ))}
            <Divider />

            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText>
                <Link
                  component={ReactLink}
                  to={"/manage-book-notification"}
                  sx={{ textDecoration: "none" }}
                  onClick={onClose}
                >
                  Xem tất cả thông báo
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Scrollbar>
      )}
    </Popover>
  );
};
