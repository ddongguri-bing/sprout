import { axiosInstance } from ".";

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
    },
  });
  return data;
};

export const updatePost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
}: {
  postId: string;
  title: string;
  image?: File | null;
  imageToDeletePublicId?: string | null;
  channelId: string;
}) => {
  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("title", title);
  formData.append("channelId", channelId);
  if (image) {
    formData.append("image", image);
  }
  if (imageToDeletePublicId) {
    formData.append("imageToDeletePublicId", imageToDeletePublicId);
  }

  const { data } = await axiosInstance.put(`/posts/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deletePost = async ({ postId }: { postId: string }) => {
  const { data } = await axiosInstance.delete(`/posts/delete`, {
    data: { id: postId },
  });
  return data;
};
