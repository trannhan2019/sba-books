import axiosClient from "@/libs/axiosClient";

export const apiStoreCompany = (data) =>
  axiosClient({
    url: "/company",
    method: "post",
    data,
  });

export const apiGetAllCompany = (params) =>
  axiosClient({
    url: "/company",
    method: "get",
    params,
  });
