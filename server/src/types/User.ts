import { type IUserRole } from './Role';

export interface IUser {
  id: number;
  username: string;
  password: string;
  role?: IUserRole;
}
