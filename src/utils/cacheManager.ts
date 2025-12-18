import { storage, EXPIRES_TIME } from './storage';
import type { UserInfo } from '@/types';

export const CACHE_KEYS = {
  USER_NAME: 'username',
  TOKEN: 'token',
  USER_PASSWORD: 'password',
  LOGIN_FLAG: 'loginFlag'
};

class CacheManager {
  setUserInfo(
    username: string,
    token: string | undefined,
    password?: string,
    expiresIn: number = EXPIRES_TIME.DAY
  ): boolean {
    const results = [
      storage.set(CACHE_KEYS.USER_NAME, username, { expiresIn }),
      storage.set(CACHE_KEYS.TOKEN, token, { expiresIn })
    ];
    if (password) {
      results.push(storage.set(CACHE_KEYS.USER_PASSWORD, password, { expiresIn }));
    }
    return results.every(Boolean);
  }

  getUserInfo(): UserInfo | null {
    const username = storage.get<string>(CACHE_KEYS.USER_NAME);
    const token = storage.get<string>(CACHE_KEYS.TOKEN);
    const password = storage.get<string>(CACHE_KEYS.USER_PASSWORD);

    if (!username || !token) return null;
    return {
      username,
      token,
      ...(password ? { password } : {})
    };
  }

  setLoginFlag(flag = true, expiresIn: number = EXPIRES_TIME.MINUTE): boolean {
    return storage.set(CACHE_KEYS.LOGIN_FLAG, flag, { expiresIn });
  }

  getLoginFlag(): boolean {
    const flag = storage.get<boolean>(CACHE_KEYS.LOGIN_FLAG) || false;
    storage.remove(CACHE_KEYS.LOGIN_FLAG);
    return flag;
  }

  clearAll() {
    storage.remove(CACHE_KEYS.USER_NAME);
    storage.remove(CACHE_KEYS.TOKEN);
    storage.remove(CACHE_KEYS.USER_PASSWORD);
    storage.remove(CACHE_KEYS.LOGIN_FLAG);
  }
}

export const cache = new CacheManager();
