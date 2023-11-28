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
// export const apiStoreBook = (data) => {
//   return axiosClient.post("/book", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };
export const apiGetListBook = (params) =>
  axiosClient({
    url: "/book",
    method: "get",
    params,
  });

export const apiUpdateBook = (data, id) =>
  axiosClient({
    url: `/book/${id}`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      _method: "PUT",
    },
  });

export const apiDeleteBook = (id) =>
  axiosClient({
    url: `/book/${id}`,
    method: "delete",
  });

export const apiDeleteBookList = (data) =>
  axiosClient({
    url: "/book",
    method: "delete",
    data,
  });
