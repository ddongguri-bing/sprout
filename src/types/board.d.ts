interface BasicPost {
  likes: string[];
  comments: Comment[];
  _id: string;
  title: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PostItem extends BasicPost {
  channel: ChannelItem | string;
}

interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string;
  createdAt: string;
  updatedAt: string;
}

interface SearchPostItem extends BasicPost {
  channel: string;
  author: string;
}
