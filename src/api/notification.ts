import { axiosInstance } from ".";

//** USER ONLY */
export const getNotification = async () => {
  return await axiosInstance.get("/notifications");
};
export const postNotification = async (body: {
  notificationType: string;
  notificationTypeId: string;
  userId: string;
  postId: string;
}) => {
  return await axiosInstance.post("/notifications", body);
};
export const putNotificationSeen = async () => {
  return await axiosInstance.put("/notifications/seen");
};
