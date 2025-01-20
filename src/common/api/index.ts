import axios from "axios";

import i18n from "@/i18n/i18n";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL ?? "https://test.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers["lang"] = i18n.language;
  return req;
});

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401) {
      //   console.log(error);
    }
    return Promise.reject(error);
  }
);
