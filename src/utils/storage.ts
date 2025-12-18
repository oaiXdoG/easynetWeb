/**
 * localStorage 统一管理工具（支持过期时间）
 */

export interface StorageOptions {
  expiresIn?: number;
}

interface StorageItem<T> {
  value: T;
  expiresAt?: number;
  createdAt: number;
}

class StorageManager {
  private prefix: string;
  private defaultExpiresIn: number;

  constructor(prefix = 'app_', defaultExpiresIn = 24 * 60 * 60 * 1000) {
    this.prefix = prefix;
    this.defaultExpiresIn = defaultExpiresIn;
  }

  private isBrowser() {
    return typeof window !== 'undefined';
  }

  private getFullKey(key: string) {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, options?: StorageOptions): boolean {
    if (!this.isBrowser()) return false;

    try {
      const now = Date.now();
      const expiresIn = options?.expiresIn ?? this.defaultExpiresIn;
      const item: StorageItem<T> = {
        value,
        createdAt: now,
        expiresAt: expiresIn ? now + expiresIn : undefined
      };
      localStorage.setItem(this.getFullKey(key), JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser()) return null;

    try {
      const raw = localStorage.getItem(this.getFullKey(key));
      if (!raw) return null;

      const item: StorageItem<T> = JSON.parse(raw);
      if (item.expiresAt && Date.now() > item.expiresAt) {
        this.remove(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Storage get error:', error);
      this.remove(key);
      return null;
    }
  }

  remove(key: string): boolean {
    if (!this.isBrowser()) return false;
    try {
      localStorage.removeItem(this.getFullKey(key));
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  clear(prefixOnly = true) {
    if (!this.isBrowser()) return;
    if (prefixOnly) {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(this.prefix))
        .forEach((k) => localStorage.removeItem(k));
    } else {
      localStorage.clear();
    }
  }
}

export const storage = new StorageManager('app_', 24 * 60 * 60 * 1000);

export const EXPIRES_TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000
} as const;

export { StorageManager };
