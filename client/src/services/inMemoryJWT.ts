import { AuthClient } from '../api/axios';
import { api_config } from '../api/api_config';

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiration: number;
}

class inMemoryJWT {
  public static inMemoryJWT: string | null = null;
  private static refreshTimeoutId: NodeJS.Timeout | null = null;

  static refreshToken(tokenExpiration: number) {
    const timeoutTrigger = tokenExpiration - 10000;

    this.refreshTimeoutId = setTimeout(() => {
      AuthClient.post<AuthResponse>('/refresh')
        .then((res) => {
          const { accessToken, accessTokenExpiration } = res.data;
          this.setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error);
    }, timeoutTrigger);
  }

  static abortRefreshToken() {
    if (this.refreshTimeoutId) {
      clearTimeout(this.refreshTimeoutId);
    }
  }

  static getToken() {
    return this.inMemoryJWT;
  }

  static setToken(token: string, tokenExpiration: number) {
    this.inMemoryJWT = token;
    this.refreshToken(tokenExpiration);
  }

  static deleteToken() {
    this.inMemoryJWT = null;
    this.abortRefreshToken();
    localStorage.setItem(api_config.LOGOUT_STORAGE_KEY, Date.now().toString());
  }
}

export default inMemoryJWT;
