export interface IMessage {
  id: number | string;
  message: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  isMe: boolean;
}
