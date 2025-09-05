import type { IUser } from "./IUser";

export interface INewMessage {
  messageId: number;
  message: string;
  date: string;
  receiverId: number;
  self: boolean;
  senderInfo: IUser;
}
