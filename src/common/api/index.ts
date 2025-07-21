import axios from "axios";

import i18n from "@/i18n/i18n";
import { router } from "@/router";

export const httpClient = axios.create({
  baseURL: "/api",
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
      localStorage.removeItem("notification_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user_role");
      router.navigate({ to: "/auth/sign-in" });
    }
    return Promise.reject(error);
  }
);
