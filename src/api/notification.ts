import { axiosInstance } from ".";

//** USER ONLY */
export const getNotification = async () => {
  return (
    await axiosInstance.get("/notifications", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3NTdkZGM1OTNiODZkN2ZhYjExYzNiYiIsImVtYWlsIjoianVueW91bmdAZ21haWwuY29tIn0sImlhdCI6MTczMzg4NzM5M30.xUWeMn25RFuVZtcKsLgAzo8Z0gZwDOP4FZ4W5kfVuEI",
      },
    })
  ).data;
};
export const postNotification = async (body: {
  notificationType: string;
  notificationTypeId: string;
  userId: string;
  postId: string;
}) => {
  return (await axiosInstance.post("/notifications", body)).data;
};
export const putNotificationSeen = async () => {
  return (await axiosInstance.put("/notifications/seen")).data;
};
