import { Response, Request } from 'express';

import type { IUser } from '../../types/User';
import type { IAuthTokens } from '../../types/AuthTokens';

export interface ISignUpRequest extends Request<{}, {}, Omit<IUser, 'id'>> {}
export interface ISignUpResponse extends Response<Omit<IAuthTokens, 'refreshToken'>> {}
