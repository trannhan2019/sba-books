import axiosClient from "@/libs/axiosClient";

export const apiStoreUser = (data) =>
  axiosClient({
    url: "/user",
    method: "post",
    data,
  });

export const apiGetAllUser = (params) =>
  axiosClient({
    url: "/user",
    method: "get",
    params,
  });

// export const apiGetListUser = () =>
//   axiosClient({
//     url: "/user/all",
//     method: "get",
//   });

export const apiDeleteUser = (id) =>
  axiosClient({
    url: `/user/${id}`,
    method: "delete",
  });

export const apiDeleteUsers = (data) =>
  axiosClient({
    url: "/user",
    method: "delete",
    data,
  });

export const apiUpdateUser = (data, id) =>
  axiosClient({
    url: `/user/${id}`,
    method: "put",
    data,
  });

// export const apiGetDepartment = (id) =>
//   axiosClient({
//     url: `/department/${id}`,
//     method: "get",
//   });

// export const apiGetCountDepartment = () =>
//   axiosClient({
//     url: "/department/count",
//     method: "get",
//   });

export const apiGetCurrentUser = () =>
  axiosClient({
    url: "/user-current",
    method: "get",
  });
