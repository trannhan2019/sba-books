import axiosClient from "@/libs/axiosClient";

export const apiStoreRole = (data) =>
  axiosClient({
    url: "/role",
    method: "post",
    data,
  });

export const apiGetAllRole = () =>
  axiosClient({
    url: "/role",
    method: "get",
  });

export const apiDeleteRole = (id) =>
  axiosClient({
    url: `/role/${id}`,
    method: "delete",
  });

export const apiUpdateRole = (data, id) =>
  axiosClient({
    url: `/role/${id}`,
    method: "put",
    data,
  });
