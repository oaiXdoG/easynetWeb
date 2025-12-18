import { api, apiWithAuth } from '@/utils/api';
import type { ApiResponse, LoginResponse } from '@/types';

/**
 * 用户登录
 */
export function login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
  return api.post<LoginResponse>('/login', { username, password });
}

/**
 * 示例：获取用户菜单（需要登录）
 */
export function fetchUserMenus() {
  return apiWithAuth.get('/menu/getUserMenus', { filter: 'active' });
}
