import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACK_END_URL}/api`;
const axiosClient = axios.create({
  baseURL: baseURL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let localToken = window.localStorage.getItem("token");
    if (localToken && typeof localToken === "string") {
      // localToken = JSON.parse(localToken);
      config.headers = { authorization: `Bearer ${localToken}` };
      return config;
    } else return config;
  },
  function (error) {
    console.log("error axios req", error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return error;
    return Promise.reject(error.response);
  }
);

export default axiosClient;
