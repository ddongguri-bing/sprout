import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const posting = async () => {
  try {
    const { data } = await axios.post(
      `https://5th.fe.dev-cos.com:5004/posts/create`
    );
    console.log("posting 성공");
    return data;
  } catch (error) {}
};
