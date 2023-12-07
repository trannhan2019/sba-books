import axiosClient from "@/libs/axiosClient";

export const apiStoreBookHistory = (data) =>
  axiosClient({
    url: "/book-history",
    method: "post",
    data,
  });
