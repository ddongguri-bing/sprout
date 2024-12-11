import { axiosInstance } from ".";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3NTdkZTA1OTNiODZkN2ZhYjExYzNlMCIsImVtYWlsIjoiamhzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MzM4OTc0ODJ9.9ma48RQB-XF_8NgViZVGVYof61LCnzGWWbM0n0faOT8`;

export const createPost = async ({
  title,
  image,
  channelId,
}: {
  title: string;
  image: File | null;
  channelId: string;
}) => {
  const formData = new FormData();
  formData.append("title", title);
  if (image) {
    formData.append("image", image);
  }
  formData.append("channelId", channelId);

  const { data } = await axiosInstance.post(`/posts/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("posting 성공");
  return data;
};

export const updatePost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
}: {
  postId: string;
  title: string;
  image?: File | null;
  imageToDeletePublicId?: string | null;
}) => {
  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("title", title);
  if (image) {
    formData.append("image", image);
  }
  if (imageToDeletePublicId) {
    formData.append("imageToDeletePublicId", imageToDeletePublicId);
  }

  const { data } = await axiosInstance.put(`/posts/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("update 성공");
  return data;
};

export const deletePost = async ({ postId }: { postId: string }) => {
  const { data } = await axiosInstance.delete(`/posts/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id: postId },
  });
  console.log("delete 성공");
  return data;
};
