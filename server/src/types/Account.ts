export enum Role {
  ADMIN = 1,
  USER = 2,
  MANAGER = 3,
}

export enum Status {
  ACTIVE = 1,
  INACTIVE = 2,
  BANNED = 3,
}

export interface Account {
  id: number;
  email: string;
  password: string;
  role?: Role;
  status?: Status;
}
