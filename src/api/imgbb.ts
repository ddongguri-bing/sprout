import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_IMAGE_UPLOAD_URL}`,
  params: { key: `${import.meta.env.VITE_IMAGE_UPLOAD_KEY}` },
  headers: { "Content-Type": "multipart/form-data" },
});

export const postImages = async (formData: FormData) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_IMAGE_UPLOAD_URL}`,
    formData,
    {
      params: { key: `${import.meta.env.VITE_IMAGE_UPLOAD_KEY}` },
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};
