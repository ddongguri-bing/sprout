interface BasicUser {
  _id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  image?: string;
  __v: number;
}
interface User extends BasicUser {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: [];
  likes: [];
  comments: [];
  followers: FollowItem[];
  following: FollowItem[];
  notifications: [];
  messages: [];
  password: string;
}

interface FollowItem extends BasicUser {
  user: string;
  follower: string;
}
