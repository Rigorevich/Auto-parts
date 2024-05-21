export enum Role {
  ADMIN = 1,
  USER = 2,
}

export enum Status {
  ACTIVE = 1,
  BANNED = 2,
}

export interface Account {
  id: number;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  phone_number?: string;
  role?: Role;
  status?: Status;
}
