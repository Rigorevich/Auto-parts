export enum ERole {
  ADMIN = 1,
  USER = 2,
}

export type IUserRole = ERole.ADMIN | ERole.USER;
