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
