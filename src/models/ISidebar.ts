export interface ILastMessage {
  id: number;
  key: number | string;
  message: string;
  personName: string;
  personId: number;
  date: string;
  isOnline?: boolean;
  hasAvatar: boolean;
}
