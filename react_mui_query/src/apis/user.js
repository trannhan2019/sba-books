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

export const apiGetCurrentUser = (id) =>
  axiosClient({
    url: `/user/user-current/${id}`,
    method: "get",
  });

export const apiUpdatePasswordUser = (id, data) =>
  axiosClient({
    url: `/user/update-password/${id}`,
    method: "put",
    data,
  });

export const apiUpdatePhotoUser = (id, data) =>
  axiosClient({
    url: `/user/update-photo/${id}`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      _method: "PUT",
    },
  });
