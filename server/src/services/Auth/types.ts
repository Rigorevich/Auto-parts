import { FingerprintResult } from 'express-fingerprint';

import type { Account } from '../../types/Account';
import type { AuthTokens } from '../../types/AuthTokens';

// Token.ts
export interface IGenerateToken extends Pick<Account, 'id' | 'email' | 'role'> {}

// Auth.ts
export interface ISignUpArguments extends Pick<Account, 'email' | 'password' | 'role' | 'status'> {
  fingerprint: FingerprintResult;
}
export interface ISignUpResponse extends AuthTokens {
  data: Account;
}

export interface ISignInArguments extends Pick<Account, 'email' | 'password'> {
  fingerprint: FingerprintResult;
}

export interface ISignInResponse extends AuthTokens {
  data: Account;
}
