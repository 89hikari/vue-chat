import type { IUser } from "./IUser";

export interface INewMessage {
  messageId: number | string;
  message: string;
  date: string;
  receiverId: number;
  self: boolean;
  senderInfo: IUser;
}
