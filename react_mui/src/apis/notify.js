import axiosClient from "@/libs/axiosClient";

export const apiGetBookNotification = () =>
  axiosClient({
    url: `/book-notification`,
    method: "get",
  });

export const apiGetBookNotificationPaginate = (params) =>
  axiosClient({
    url: `/book-notification/paginate`,
    method: "get",
    params,
  });

export const apiUpdateBookNotification = (id) =>
  axiosClient({
    url: `/book-notification/${id}`,
    method: "put",
  });
