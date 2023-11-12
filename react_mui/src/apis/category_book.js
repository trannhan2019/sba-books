import axiosClient from "@/libs/axiosClient";

export const apiStoreCategoryBook = (data) =>
  axiosClient({
    url: "/category-book",
    method: "post",
    data,
  });

export const apiGetCategoryBook = (params) =>
  axiosClient({
    url: "/category-book",
    method: "get",
    params,
  });

export const apiGetAllCategoryBook = () =>
  axiosClient({
    url: "/category-book/all",
    method: "get",
  });

export const apiDeleteCategoryBook = (id) =>
  axiosClient({
    url: `/category-book/${id}`,
    method: "delete",
  });

export const apiDeleteCategoryBooks = (data) =>
  axiosClient({
    url: "/category-book",
    method: "delete",
    data,
  });

export const apiUpdateCategoryBook = (data, id) =>
  axiosClient({
    url: `/category-book/${id}`,
    method: "put",
    data,
  });
