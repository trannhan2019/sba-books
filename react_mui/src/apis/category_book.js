import axiosClient from "@/libs/axiosClient";

export const apiStoreCategoryBook = (data) =>
  axiosClient({
    url: "/category-book",
    method: "post",
    data,
  });

export const apiGetAllCategoryBook = (params) =>
  axiosClient({
    url: "/category-book",
    method: "get",
    params,
  });

export const apiDeleteCategoryBook = (id) =>
  axiosClient({
    url: `/category-book/${id}`,
    method: "delete",
  });

export const apiUpdateCategoryBook = (data, id) =>
  axiosClient({
    url: `/category-book/${id}`,
    method: "put",
    data,
  });
