import { AuthClient } from '../api/axios';
import { api_config } from '../api/api_config';

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiration: number;
}

class inMemoryJWT {
  private static inMemoryJWT: string | null = null;
  private static refreshTimeoutId: NodeJS.Timeout | null = null;

  private static refreshToken(expiration: number) {
    const timeoutTrigger = expiration - 10000;

    this.refreshTimeoutId = setTimeout(() => {
      AuthClient.post('/refresh')
        .then((res) => {
          const { accessToken, accessTokenExpiration } = res.data;
          this.setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error);
    }, timeoutTrigger);
  }

  private static abortRefreshToken() {
    if (this.refreshTimeoutId) {
      clearTimeout(this.refreshTimeoutId);
    }
  }

  public static getToken() {
    return this.inMemoryJWT;
  }

  public static setToken(token: string, tokenExpiration: number) {
    this.inMemoryJWT = token;
    this.refreshToken(tokenExpiration);
  }

  public static deleteToken() {
    this.abortRefreshToken();
    this.inMemoryJWT = null;
    localStorage.setItem(api_config.LOGOUT_STORAGE_KEY, Date.now().toString());
  }
}

export default inMemoryJWT;
