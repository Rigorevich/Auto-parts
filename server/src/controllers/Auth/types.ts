import { Response, Request } from 'express';

import type { Account } from '../../types/Account';
import type { AuthTokens } from '../../types/AuthTokens';

export interface ISignUpRequest extends Request<{}, {}, Omit<Account, 'id'>> {}
export interface ISignUpResponse
  extends Response<Omit<AuthTokens, 'refreshToken'> & { accountData: Account }> {}
