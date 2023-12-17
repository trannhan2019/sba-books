import { useCallback, useRef, useState, useEffect } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { NotificationsPopover } from "./notifications-popover";
import Pusher from "pusher-js";
import { apiGetBookNotification } from "@/apis/notify";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setNotifications,
  setNotiUnreadCount,
} from "@/store/notify/notifySlice";

export const NotificationsButton = () => {
  const { user } = useSelector((state) => state.auth);
  const { notifications, notiUnreadCount } = useSelector(
    (state) => state.notify
  );
  // const [message, setMessage] = useState('');
  // let allMessages = [];
  const dispatch = useDispatch();

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
    // console.log(response);
    if (user.username === "sba_manager") {
      dispatch(setNotifications(response.data.notificationList));
      dispatch(setNotiUnreadCount(response.data.notificationUnreadCount));
    }
  };

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_ID, {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("sba-book-manage");

    if (user.username === "sba_manager") {
      channel.bind("book-notification-event", async function (data) {
        // setNotifications((oldState) => [...oldState, data]);
        // allMessages.push(data);
        //     setMessages(allMessages);
        await fetchData();
        //sau nay mo rong chuc nang thong bao all se su dung switch case tham khao notify devias

        toast.info(`${data.sender.name} vừa mượn/trả sách`);

        console.log(data);
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={anchorRef} onClick={handlePopoverOpen}>
          <Badge color="error" badgeContent={notiUnreadCount} max={99}>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        notifications={notifications}
        onClose={handlePopoverClose}
        open={openPopover}
        fetchData={fetchData}
      />
    </>
  );
};
