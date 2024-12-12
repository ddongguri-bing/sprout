import { axiosInstance } from ".";
type User = {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

type Post = {
  likes: string[];
  comments: string[];
  _id: string;
  title: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type NotiType = {
  seen: boolean;
  _id: string;
  author: User;
  user: User;
  post: string;
  like?: {
    _id: string;
    user: string;
    post: Post;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  comment?: {
    _id: string;
    comment: string;
    author: string;
    post: {
      likes: string[];
      comments: string[];
      _id: string;
      title: string;
      channel: string;
      author: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

//** USER ONLY */
export const getNotification = async (): Promise<NotiType[]> => {
  return (await axiosInstance.get("/notifications")).data;
};

// notificationTypeId
// COMMENT COMMENT의 ID
// FOLLOW FOLLOW 자체의 ID
// LIKE LIKE 자체의 ID

export const postNotification = async (body: {
  notificationType: string;
  notificationTypeId: string;
  userId: string;
  postId: string;
}) => {
  return (await axiosInstance.post("/notifications/create", body)).data;
};
export const putNotificationSeen = async () => {
  return (await axiosInstance.put("/notifications/seen")).data;
};
