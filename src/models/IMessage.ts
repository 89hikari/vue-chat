export interface IMessage {
  id: number;
  message: string;
  senderId: number;
  receiverId: number;
  date: string;
  time: string;
  isMe: boolean;
}
