/**
 * 认证模块 API
 * 对应页面: views/Auth/
 */

import { request } from '../request'
import type { LoginParams, LoginResult } from '@/types'

// 登录
export function login(data: LoginParams) {
  return request.post<LoginResult>('/auth/login', data)
}

// 登出
export function logout() {
  return request.post('/auth/logout')
}

// 刷新 Token
export function refreshToken() {
  return request.post('/auth/refresh')
}

// 获取当前用户信息
export function getCurrentUser() {
  return request.get('/auth/me')
}
