import axiosClient from "@/libs/axiosClient";

export const apiStoreDepartment = (data) =>
  axiosClient({
    url: "/department",
    method: "post",
    data,
  });

export const apiGetAllDepartment = (params) =>
  axiosClient({
    url: "/department",
    method: "get",
    params,
  });

export const apiGetListDepartment = () =>
  axiosClient({
    url: "/department/all",
    method: "get",
  });

export const apiDeleteDepartment = (id) =>
  axiosClient({
    url: `/department/${id}`,
    method: "delete",
  });

export const apiDeleteDepartments = (data) =>
  axiosClient({
    url: "/department",
    method: "delete",
    data,
  });

export const apiUpdateDepartment = (data, id) =>
  axiosClient({
    url: `/department/${id}`,
    method: "put",
    data,
  });

export const apiGetDepartment = (id) =>
  axiosClient({
    url: `/department/${id}`,
    method: "get",
  });

export const apiGetCountDepartment = () =>
  axiosClient({
    url: "/department/count",
    method: "get",
  });
