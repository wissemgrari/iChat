export interface LoginRequest {
  email: string;
  password: string;
}

export interface MessageRequest {
  message: {
    content: string;
    senderID: number;
    recipientID: number;
  };
  chatID: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageURL?: string;
}

export interface Message {
  id: number;
  chat_id: number;
  content: string;
  createdAt: Date;
  status: 'DELIVERED' | 'SEEN';
  senderID: number;
}

export interface Chat {
  id: number;
  createdAt: Date;
  user1: User;
  user2: User;
  msgPreview: Message;
}