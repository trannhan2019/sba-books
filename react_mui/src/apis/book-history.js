import axiosClient from "@/libs/axiosClient";

export const apiStoreBookHistory = (data) =>
  axiosClient({
    url: "/book-history",
    method: "post",
    data,
  });

export const apiUpdateBookHistory = (id) =>
  axiosClient({
    url: `/book-history/user/${id}`,
    method: "post",
  });

export const apiGetBookHistoryByUser = () =>
  axiosClient({
    url: `/book-history/user`,
    method: "get",
  });
