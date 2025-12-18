import axios, { type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios';
import { ElMessage } from 'element-plus';
import { cache } from '@/utils/cacheManager';
import type { ApiResponse } from '@/types';

const baseURL =
  import.meta.env.MODE === 'development'
    ? '/api.ts/proxy'
    : import.meta.env.VITE_API_URL || 'http://192.168.1.3:8999';

const instance = axios.create({
  baseURL,
  timeout: 15000
});

// 请求拦截：注入 token 与 username
instance.interceptors.request.use((config) => {
  const userInfo = cache.getUserInfo();
  const headers = { ...(config.headers || {}) } as AxiosRequestHeaders;

  if (userInfo?.token) {
    headers.Token = userInfo.token;
    headers.username = userInfo.username;
  }

  if (config.method && config.method.toLowerCase() !== 'get') {
    headers['Content-Type'] = 'application/json';
  }

  config.headers = headers;
  return config;
});

// 响应拦截：处理 token 过期与错误提示
instance.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse;
    if (data?.code === 4) {
      cache.clearAll();
      if (typeof window !== 'undefined') {
        ElMessage.error('登录已过期，请重新登录');
        window.location.href = '/login';
      }
    }
    return response;
  },
  (error) => {
    const msg = error?.response?.data?.message || error?.message || '请求失败';
    ElMessage.error(msg);
    return Promise.reject(error);
  }
);

function enhanceWithAuth<T extends Record<string, any>>(payload?: T) {
  const userInfo = cache.getUserInfo();
  if (!userInfo?.username || !userInfo?.token) {
    throw new Error('用户未登录或认证信息缺失');
  }
  return {
    ...(payload || {}),
    username: userInfo.username,
    token: userInfo.token
  };
}

const api = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const res = await instance.get(url, config);
    return res.data as ApiResponse<T>;
  },
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const res = await instance.post(url, data, config);
    return res.data as ApiResponse<T>;
  },
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const res = await instance.put(url, data, config);
    return res.data as ApiResponse<T>;
  },
  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const res = await instance.delete(url, config);
    return res.data as ApiResponse<T>;
  }
};

export const apiWithAuth = {
  get<T>(url: string, params?: Record<string, any>) {
    return api.get<T>(url, { params: enhanceWithAuth(params) });
  },
  post<T>(url: string, data?: Record<string, any>) {
    return api.post<T>(url, enhanceWithAuth(data));
  }
};

export { api };
