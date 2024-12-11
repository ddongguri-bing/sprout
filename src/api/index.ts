import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const posting = async () => {
  try {
    const { data } = await axiosInstance.post(`/posts/create`);
    console.log("posting 성공");
    return data;
  } catch (error) {}
};
