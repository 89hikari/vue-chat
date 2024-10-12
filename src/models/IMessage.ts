export interface IMessage {
  id: number | string;
  message: string;
  senderId: number;
  receiverId: number;
  date: string;
  time: string;
  isMe: boolean;
}
