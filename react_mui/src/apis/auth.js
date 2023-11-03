import axiosClient from "@/libs/axiosClient";

export const apiLogin = (data) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
  });
