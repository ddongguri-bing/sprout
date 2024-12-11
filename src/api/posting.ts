import { axiosInstance } from ".";

export const createPost = async ({
  title,
  image,
  channelId,
}: {
  title: string;
  image: FileList | null;
  channelId: string;
}) => {
  const formData = new FormData();
  formData.append("title", title);
  if (image) {
    Array.from(image).forEach((file) => formData.append("image", file));
  }
  formData.append("channelId", channelId);

  const { data } = await axiosInstance.post(`/posts/create`, formData);
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
  image: FileList | null;
  imageToDeletePublicId: string;
}) => {
  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("title", title);
  if (image) {
    Array.from(image).forEach((file) => formData.append("image", file));
  }
  if (imageToDeletePublicId) {
    formData.append("imageToDeletePublicId", imageToDeletePublicId);
  }

  const { data } = await axiosInstance.put(`/posts/update`, formData);
  console.log("update 성공");
  return data;
};

export const deletePost = async ({ postId }: { postId: string }) => {
  const { data } = await axiosInstance.delete(`/posts/delete`, {
    data: { id: postId },
  });
  console.log("delete 성공");
  return data;
};
