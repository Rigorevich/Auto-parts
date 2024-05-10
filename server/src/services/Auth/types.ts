import { FingerprintResult } from 'express-fingerprint';

import type { IUser } from '../../types/User';
import type { IAuthTokens } from '../../types/AuthTokens';

// Token.ts
export interface IGenerateToken extends Pick<IUser, 'id' | 'username' | 'role'> {}

// Auth.ts
export interface ISignUpArguments extends Pick<IUser, 'username' | 'password' | 'role'> {
  fingerprint: FingerprintResult;
}
export interface ISignUpResponse extends IAuthTokens {}

export interface ISignInArguments extends Pick<IUser, 'username' | 'password'> {
  fingerprint: FingerprintResult;
}

export interface ISignInResponse extends IAuthTokens {}
