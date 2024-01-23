import axiosClient from "@/libs/axiosClient";

export const apiGetOverView = () =>
  axiosClient({
    url: "/over-view",
    method: "get",
  });
