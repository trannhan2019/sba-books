import axiosClient from "@/libs/axiosClient";

export const apiLogin = (data) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
  });

export const apiLogout = () =>
  axiosClient({
    url: "/auth/logout",
    method: "post",
  });
