import axiosClient from "@/libs/axiosClient";
export const apiGetBookNotification = () =>
  axiosClient({
    url: `/book-notification`,
    method: "get",
  });
