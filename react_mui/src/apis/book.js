import axiosClient from "@/libs/axiosClient";

export const apiStoreBook = (data) =>
  axiosClient({
    url: "/book",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
