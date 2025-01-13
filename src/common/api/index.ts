import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL ?? "https://test.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
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
