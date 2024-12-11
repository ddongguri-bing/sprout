import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let retry = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config;
    if (error.response?.status === 401 && !retry) {
      retry = true; // 1번만시도
      try {
        const token = document.cookie.match(/token=([^ ]+)/)?.[1];
        const { data } = await axiosInstance.get("/token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        useAuthStore.setState({
          token: token,
          user: data,
          isLoggedIn: true,
        });
        retry = false; // 성공하면 다시 시도할 수 있게 수정
        originRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return axiosInstance(originRequest);
      } catch (err) {
        console.log(err);
        const logout = useAuthStore.getState().logout;
        logout();
        document.cookie = `token=`;
      }
    }
  }
);
