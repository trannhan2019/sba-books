import axiosClient from "@/libs/axiosClient";

export const apiGetBookNotification = () =>
  axiosClient({
    url: `/book-notification`,
    method: "get",
  });

export const apiUpdateBookNotification = (id) =>
  axiosClient({
    url: `/book-notification/${id}`,
    method: "put",
  });
