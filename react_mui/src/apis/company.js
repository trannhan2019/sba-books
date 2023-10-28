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

export const apiDeleteCompany = (id) =>
  axiosClient({
    url: `/company/${id}`,
    method: "delete",
  });

export const apiDeleteCompanies = (data) =>
  axiosClient({
    url: "/company",
    method: "delete",
    data,
  });

export const apiUpdateCompany = (data, id) =>
  axiosClient({
    url: `/company/${id}`,
    method: "put",
    data,
  });

export const apiGetCompany = (id) =>
  axiosClient({
    url: `/company/${id}`,
    method: "get",
  });

export const apiGetAllCompanyforSelect = () =>
  axiosClient({
    url: "/company/all",
    method: "get",
  });
