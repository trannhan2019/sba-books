import { useCallback, useRef, useState, useEffect } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { NotificationsPopover } from "./notifications-popover";
import Pusher from "pusher-js";
import { apiGetBookNotification } from "@/apis/notify";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const NotificationsButton = () => {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  // const [message, setMessage] = useState('');
  // let allMessages = [];

  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  //call api get notification and get pusher
  const fetchData = async () => {
    const response = await apiGetBookNotification();
    console.log(response);
    if (user.username === "sba_manager") {
      setNotifications(response.data);
    }
  };

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_ID, {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("sba-book-manage");
    channel.bind("book-notification-event", async function (data) {
      // setNotifications((oldState) => [...oldState, data]);
      // allMessages.push(data);
      //     setMessages(allMessages);
      await fetchData();
      if (user.username === "sba_manager") {
        toast.info(`${data.sender.name} vừa mượn/trả sách`);
      }
      console.log(data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={anchorRef} onClick={handlePopoverOpen}>
          <Badge color="error" badgeContent={4}>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        notifications={notifications}
        onClose={handlePopoverClose}
        open={openPopover}
      />
    </>
  );
};
