/**
 * Token 和本地存储工具
 */

const TOKEN_KEY = 'easynet_token'
const REFRESH_TOKEN_KEY = 'easynet_refresh_token'
const TOKEN_EXPIRES_KEY = 'easynet_token_expires'

// Token 管理
export const tokenStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },

  getTokenExpires(): number | null {
    const expires = localStorage.getItem(TOKEN_EXPIRES_KEY)
    return expires ? parseInt(expires, 10) : null
  },

  setTokenExpires(expires: number): void {
    localStorage.setItem(TOKEN_EXPIRES_KEY, String(expires))
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRES_KEY)
  },

  isTokenExpired(): boolean {
    const expires = this.getTokenExpires()
    if (!expires) return true
    return Date.now() > expires
  }
}

// 通用存储
export const storage = {
  get<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch {
      return value as unknown as T
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key)
  },

  clear(): void {
    localStorage.clear()
  }
}
