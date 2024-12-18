interface MessageItem {
  message: string;
  createdAt: string;
  _id: string;
  seen: boolean;
  receiver: User;
  sender: User;
}

interface MessageChat {
  message: string;
  messageId: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  chatTime: string;
  seen: boolean;
  isReceived: boolean;
}
