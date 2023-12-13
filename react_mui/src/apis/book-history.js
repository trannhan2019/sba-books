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
    method: "put",
  });

export const apiGetBookHistoryByUser = (params) =>
  axiosClient({
    url: `/book-history/user`,
    method: "get",
    params,
  });

export const apiGetBookHistory = (params) =>
  axiosClient({
    url: `/book-history`,
    method: "get",
    params,
  });

export const apiDeleteBookHistory = (id) =>
  axiosClient({
    url: `/book-history/${id}`,
    method: "delete",
  });
