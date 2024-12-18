import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { useCookies } from "react-cookie";

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
    const [cookies, _, remove] = useCookies(["token"]);
    const originRequest = error.config;
    if (error.response?.status === 401 && !retry) {
      retry = true; // 1번만시도
      try {
        const { token } = cookies;
        const { data } = await axiosInstance.get("/auth-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data) {
          useAuthStore.setState({
            token: token,
            user: data,
            isLoggedIn: true,
          });
          retry = false; // 성공하면 다시 시도할 수 있게 수정
          originRequest.headers["Authorization"] = `Bearer ${data.token}`;
        }
        return axiosInstance(originRequest);
      } catch (err) {
        console.error(err);
        const logout = useAuthStore.getState().logout;
        logout();
        remove("token");
      }
    }
    return Promise.reject(error);
  }
);
