export interface IUser {
  id: number;
  email: string;
  name: string;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
}

export interface IMyUser {
  token: string | null;
  info: IUser | null;
}

export interface IUserListItem extends Pick<IUser, "id" | "email" | "name"> {
  id: number;
  email: string;
  name: string;
}
